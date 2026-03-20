import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Select, Button, Alert } from 'antd';
import { leaveService } from '../utils/leaveService';

export default function LeaveSignup() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setError('');
    setLoading(true);
    try {
      const createFn = values.role === 'MANAGER' ? leaveService.createManager : leaveService.createUser;
      const res = await createFn({ name: values.name, email: values.email, password: values.password });
      if (res.id || res.token || res.message) {
        navigate('/leave/login');
      } else {
        setError(res.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Join Leave Management System</p>
        </div>

        {error && <Alert message={error} type="error" showIcon className="mb-4" />}

        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ role: 'USER' }}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Enter your full name' }]}>
            <Input size="large" placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters' }]}>
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select size="large">
              <Select.Option value="USER">User</Select.Option>
              <Select.Option value="MANAGER">Manager</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
              style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)', border: 'none' }}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-gray-600 mt-2">
          Already have an account?{' '}
          <Link to="/leave/login" className="text-purple-600 font-semibold hover:underline">Sign In</Link>
        </p>
        <Link to="/" className="block text-center text-gray-500 mt-4 hover:text-gray-700">← Back to Home</Link>
      </div>
    </div>
  );
}
