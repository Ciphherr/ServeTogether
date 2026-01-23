const SuccessToast = () => {
  return (
    <div className="fixed top-6 right-1/2 z-50 ">
      <div className="flex items-center gap-3 rounded-xl bg-green-200 px-5 py-3 text-black shadow-lg animate-slideDown border-2 border-emerald-800">
        <span className="text-xl">✅</span>
        <p className="text-sm font-medium">
          Registered successfully
        </p>
      </div>
    </div>
  );
};

export default SuccessToast;
