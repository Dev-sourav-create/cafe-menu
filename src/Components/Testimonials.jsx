export default function Testimonials() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-slate-800">
      {/* Profile Images */}
      <div className="flex items-center -space-x-3">
        <div className="relative group flex flex-col items-center">
          <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 mb-3 px-2 py-1 text-sm font-medium">
            Michael
          </p>
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
            alt="image"
            className="w-14 h-14 rounded-full border-4 border-white hover:-translate-y-1 transition hover:scale-110"
          />
        </div>

        <div className="relative group flex flex-col items-center">
          <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 mb-3 px-2 py-1 text-sm font-medium">
            James
          </p>
          <img
            src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=200"
            alt="image"
            className="w-14 h-14 rounded-full border-4 border-white hover:-translate-y-1 transition hover:scale-110"
          />
        </div>

        <div className="relative group flex flex-col items-center">
          <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 mb-3 px-2 py-1 text-sm font-medium">
            Emily
          </p>
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
            alt="image"
            className="w-14 h-14 rounded-full border-4 border-white hover:-translate-y-1 transition hover:scale-110"
          />
        </div>

        <div className="relative group flex flex-col items-center">
          <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 mb-3 px-2 py-1 text-sm font-medium">
            John
          </p>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
            alt="image"
            className="w-14 h-14 rounded-full border-4 border-white hover:-translate-y-1 transition hover:scale-110"
          />
        </div>
      </div>

      {/* Rating Section */}
      <div className="pt-8 md:mt-0 text-center md:text-left">
        <p className="text-lg font-medium">Loved by users</p>
        <div className="flex justify-center md:justify-start gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                fill="#FF532E"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
