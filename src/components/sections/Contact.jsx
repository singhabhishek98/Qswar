import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaPhone } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { contactService } from '../../utils/contactService.js'

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  mobile: yup.string().required('Mobile number is required').matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
  message: yup.string().max(500, 'Message cannot exceed 500 characters')
}).required();

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
    resolver: yupResolver(schema)
  });
  
  const messageValue = watch('message', '');
  const maxLength = 500;

  const onSubmit = async (data) => {
    try {
      await contactService.sendMessage(data);
      alert('Message sent successfully!');
      reset();
    } catch (err) {
      alert('Error sending message');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-8 bg-gray-50 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 sm:mb-12">Get In Touch</h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Your Name" 
              {...register('name')}
              className={`p-4 pl-12 border-2 rounded-lg focus:outline-none focus:ring-4 transition w-full ${
                errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25' : 'border-gray-300 focus:border-purple-600 focus:ring-purple-600/25'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 text-left">{errors.name.message}</p>}
          </div>
          
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              placeholder="Your Email" 
              {...register('email')}
              className={`p-4 pl-12 border-2 rounded-lg focus:outline-none focus:ring-4 transition w-full ${
                errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25' : 'border-gray-300 focus:border-purple-600 focus:ring-purple-600/25'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>}
          </div>
          
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="tel" 
              placeholder="Your Mobile Number (10 digits)" 
              {...register('mobile')}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                setValue('mobile', onlyNums);
              }}
              maxLength={10}
              className={`p-4 pl-12 border-2 rounded-lg focus:outline-none focus:ring-4 transition w-full ${
                errors.mobile ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25' : 'border-gray-300 focus:border-purple-600 focus:ring-purple-600/25'
              }`}
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1 text-left">{errors.mobile.message}</p>}
          </div>
          
          <div className="relative">
            <textarea 
              placeholder="Your Message" 
              rows="3" 
              {...register('message')}
              className={`p-4 pl-12 border-2 rounded-lg focus:outline-none focus:ring-4 transition w-full ${
                errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25' : 'border-gray-300 focus:border-purple-600 focus:ring-purple-600/25'
              }`}
            ></textarea>
            <div className="text-right text-sm text-gray-500 mt-1">{messageValue.length}/{maxLength}</div>
            {errors.message && <p className="text-red-500 text-sm mt-1 text-left">{errors.message.message}</p>}
          </div>
          
          <button type="submit" className="bg-gradient-to-r from-blue-800 to-purple-600 text-white px-8 py-3 rounded-full text-base font-semibold hover:-translate-y-1 hover:shadow-xl transition-all flex items-center justify-center gap-2 w-fit">
            <FaPaperPlane />Send Message
          </button>
        </form>
        
        <div className="flex flex-col gap-6 text-left">
          <div className="flex items-center gap-4 text-lg text-gray-600">
            <span>📧</span> <span>info@qswar.com</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-600">
            <span>📞</span> <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-600">
            <span>📍</span> <span>Delhi, India</span>
          </div>
          <div className="text-8xl sm:text-9xl text-center mt-4 sm:mt-8">🗺️</div>
        </div>
      </div>
    </section>
  )
}
