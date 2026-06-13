import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-zinc-100 mb-2">Coś poszło nie tak</h1>
            <p className="text-zinc-500 mb-6 text-sm font-mono">{this.state.error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              Odśwież stronę
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
