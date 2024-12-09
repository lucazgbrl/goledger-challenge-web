interface LoadingMessageProps {
  pageName: string;
}

const LoadingMessage = ({ pageName }: LoadingMessageProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-white text-xl">Loading {pageName}...</div>
    </div>
  );
};

export default LoadingMessage;
