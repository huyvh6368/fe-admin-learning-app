export function FullScreenLoader() {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
        </div>
    );
}