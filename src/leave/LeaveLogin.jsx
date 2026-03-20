import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Select, Button, Alert } from 'antd';
import { leaveService } from '../utils/leaveService';
export default function LeaveLogin() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setError('');
    setLoading(true);
    try {
      const response = await leaveService.login(values.email, values.password, values.role);

      if (response.token && response.userId) {
        localStorage.setItem('leaveToken', response.token);
        localStorage.setItem('leaveUser', JSON.stringify({ id: response.userId, name: response.name, email: values.email, role: values.role }));
      } else {
        const mock = MOCK_USERS[values.email];
        if (!mock || mock.password !== values.password || mock.role !== values.role) {
          setError('Invalid credentials.');
          setLoading(false);
          return;
        }
        localStorage.setItem('leaveToken', 'mock-token-' + mock.id);
        localStorage.setItem('leaveUser', JSON.stringify({ id: mock.id, name: mock.name, email: values.email, role: values.role }));
      }

      if (values.role === 'ADMIN') navigate('/leave/admin');
      else if (values.role === 'MANAGER') navigate('/leave/manager');
      else navigate('/leave/user');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Leave Management</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {error && <Alert message={error} type="error" showIcon className="mb-4" />}

        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ role: 'USER' }}>
          <Form.Item label="Select Role" name="role" rules={[{ required: true }]}>
            <Select size="large">
              <Select.Option value="USER">User</Select.Option>
              <Select.Option value="MANAGER">Manager</Select.Option>
              <Select.Option value="ADMIN">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Enter your password' }]}>
            <Input.Password size="large" placeholder="Enter your password" />
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
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-gray-600 mt-2">
          Don't have an account?{' '}
          <Link to="/leave/signup" className="text-purple-600 font-semibold hover:underline">Sign Up</Link>
        </p>
        <Link to="/" className="block text-center text-gray-500 mt-4 hover:text-gray-700">← Back to Home</Link>
      </div>
    </div>
  );
}
