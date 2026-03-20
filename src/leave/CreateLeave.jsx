import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Select, DatePicker, Input, Button, Alert } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import { leaveService } from '../utils/leaveService';

const CreateLeave = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      leaveService.getUserLeaves().then(res => {
        const leaves = Array.isArray(res) ? res : res.data || [];
        const leave = leaves.find(l => l.id === id);
        if (leave) {
          form.setFieldsValue({
            leaveType: leave.leaveType,
            startDate: dayjs(leave.startDate),
            endDate: dayjs(leave.endDate),
            reason: leave.reason,
          });
        }
      });
    }
  }, [id]);

  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    const payload = {
      leaveType: values.leaveType,
      startDate: values.startDate.format('YYYY-MM-DD'),
      endDate: values.endDate.format('YYYY-MM-DD'),
      reason: values.reason,
    };
    try {
      let response;
      if (isEdit) {
        response = await leaveService.updateLeave(id, payload);
      } else {
        response = await leaveService.createLeave(payload);
        if (response.id || response.leaveType) {
          await leaveService.submitLeave(response.id);
        }
      }
      if (response.id || response.leaveType || response.success) {
        navigate('/leave/user');
      } else {
        setError(response.message || 'Failed to save leave request');
      }
    } catch (err) {
      setError('Failed to save leave request');
    } finally {
      setLoading(false);
    }
  };

  const today = dayjs();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{isEdit ? 'Edit Leave Request' : 'Create Leave Request'}</h2>
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">✕</button>
          </div>

          {error && <Alert message={error} type="error" showIcon className="mb-4" />}

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Leave Type" name="leaveType" rules={[{ required: true, message: 'Select leave type' }]}>
              <Select size="large" placeholder="Select leave type">
                <Select.Option value="Sick">Sick Leave</Select.Option>
                <Select.Option value="Casual">Casual Leave</Select.Option>
                <Select.Option value="Earned">Earned Leave</Select.Option>
              </Select>
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="From Date" name="startDate" rules={[{ required: true, message: 'Select start date' }]}>
                <DatePicker size="large" className="w-full" disabledDate={d => d && d < today.startOf('day')} />
              </Form.Item>
              <Form.Item label="To Date" name="endDate" rules={[{ required: true, message: 'Select end date' }]}>
                <DatePicker size="large" className="w-full" disabledDate={d => {
                  const start = form.getFieldValue('startDate');
                  return d && d < (start || today).startOf('day');
                }} />
              </Form.Item>
            </div>

            <Form.Item label="Reason" name="reason" rules={[{ required: true, message: 'Enter reason' }]}>
              <Input.TextArea rows={4} placeholder="Please provide reason for leave..." />
            </Form.Item>

            <div className="flex gap-2">
              <Button type="primary" htmlType="submit" loading={loading} size="large"
                style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)', border: 'none' }}>
                {isEdit ? 'Update Request' : 'Submit Request'}
              </Button>
              <Button size="large" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateLeave;
