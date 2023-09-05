import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { helpLst, postList } from "../../../util/constants";

export default function HelpPage() {
    const {userLogin} = useSelector((state:RootState) => state.loginReducer);
    return (
        <>
            <section className="py-10 container px-5 mx-auto">
                <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-medium mb-10">Xin chào {userLogin ? userLogin.user.name : ''}! Chúng tôi có thể giúp gì cho bạn?</h1>
                <h3 className="text-xl sm:text-2xl font-medium mb-5">Hướng dẫn khi mới bắt đầu</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {new Array(4).fill(null).map((_,index) => {
                        return (
                            <div key={index}>
                                <img className="rounded-xl w-full mb-3" src={index === 3 ? './../img/help_img3.png' : `./../img/help_img${index}.jpg`} alt="anh" />
                                <a href={helpLst[index].link} target="_blank" className="font-medium text-lg">{helpLst[index].title}</a>
                            </div>
                        )
                    })}
                </div>
                <h3 className="text-xl sm:text-2xl font-medium mb-8">Bài viết hàng đầu</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {postList.map((item,index) => {
                        return (
                            <a href={item.link} target="_blank" key={index} className="block border-b border-gray-300 cursor-pointer">
                                <h1 className="underline font-medium text-lg mb-5">{item.title}</h1>
                                <p className="font-light text-gray-600 text-lg mb-5">{item.desc}</p>
                            </a>
                        )
                    })}
                </div>
            </section>
            <section className="bg-black py-20">
                <div className="container px-5 md:px-0 mx-auto">
                    <h1 className="text-xl sm:text-2xl text-white font-medium mb-5">Khám phá thêm</h1>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        <div className="rounded-xl overflow-hidden">
                            <img className="w-full h-52" src="https://images.contentstack.io/v3/assets/bltec2ed8e3c4b1e16d/blt6a2935c750dda8a0/6179c6499778eb18575b3c0b/Airbnb-Policy-Web.png" alt="anh" />
                            <div className="p-3 h-full" style={{backgroundColor:'#222222'}}>
                                <h1 className="sm:text-lg font-medium text-white">Chính sách cộng đồng</h1>
                                <p className="text-white font-light">Cách chúng tôi xây dựng một nền tảng của sự tin tưởng</p>
                            </div>
                        </div>
                        <div className="rounded-xl overflow-hidden">
                            <img className="w-full h-52" src="https://images.contentstack.io/v3/assets/bltec2ed8e3c4b1e16d/blt93efaa7b7d28041c/Airbnb-Safety-Web.png" alt="anh" />
                            <div className="p-3 h-full" style={{backgroundColor:'#222222'}}>
                                <h1 className="sm:text-lg font-medium text-white">Mẹo và hướng dẫn về an toàn</h1>
                                <p className="text-white font-light">Tài nguyên giúp đảm bảo an toàn cho du khách</p>
                            </div>
                        </div>
                        <div className="text-white">
                            <h1 className="text-2xl font-medium mb-4">Bạn cần liên hệ</h1>
                            <p className="sm:text-lg mb-5 font-light">Để bắt đầu, vui lòng trả lời một số câu hỏi để chúng tôi có thể kết nối bạn với bộ phận phù hợp.</p>
                            <div className="text-center mb-5">
                                <button className="bg-white w-full p-2 rounded-lg text-black font-medium hover:bg-gray-50 duration-300">Liên hệ với chúng tôi</button>
                            </div>
                            <p className="sm:text-lg">Bạn cũng có thể <a className="underline" href="">gửi phản hồi cho chúng tôi.</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
        
    )
}
