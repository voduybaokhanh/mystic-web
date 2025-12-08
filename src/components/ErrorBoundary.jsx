import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-mystic-dark text-white flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🔮</div>
            <h1 className="text-2xl font-bold text-mystic-gold mb-4">
              Đã xảy ra lỗi
            </h1>
            <p className="text-gray-300 mb-6">
              Vũ trụ đang có chút xáo trộn. Vui lòng tải lại trang để tiếp tục.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-mystic-gold text-mystic-dark font-bold rounded-full hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-mystic-gold focus:ring-offset-2 focus:ring-offset-mystic-dark"
              aria-label="Tải lại trang"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

