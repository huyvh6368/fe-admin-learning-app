import HeaderApp from "./HeaderApp";
import SideBarApp from "./SideBarApp";

function DefaultLayout({ children }) {
    return (
        <div className="h-screen w-full flex flex-col">
            <HeaderApp />
            <div className="flex flex-row flex-1 overflow-y-hidden">
                <SideBarApp />
                <main className="flex-1 overflow-y-scroll ">
                    {children} {/* Sử dụng prop children để hiển thị nội dung */}
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;