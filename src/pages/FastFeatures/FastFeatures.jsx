import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import Carousel from '../../components/Carousel/Carousel';
import slide1 from '../../assets/icons/slide1.svg';
import slide2 from '../../assets/icons/slide2.svg';
import uitPattern from '../../assets/icons/uitPattern.svg'
import readMoney from "../../utils/n2vi";
const Home = () => {
    const slides = [
        slide1,
        slide2,
    ]
    const sum = readMoney('124567');
    return (
        <div className="grid grid-cols-11 grid-flow-col-dense">
            <div className="col-start-1 col-span-2">
                <UserInfo />
            </div>
            <div className="col-end-12 col-span-9 flex flex-col">
                <div className="sticky top-0">
                    <Header />
                </div>
                <div className="relative w-full h-full flex justify-center content-center">
                    <img src={uitPattern} alt="UIT-Pattern"/>
                    <div className="w-full h-full absolute grid grid-cols-2 bg-[#40494C] opacity-70">
                        <div className="col-start-0 col-span-1 overflow-auto">
                            <h1 className="text-9xl">
                            Hãy để tôi viết về một cảnh đẹp tự nhiên để bạn có thể thư giãn và tưởng tượng:

Trên đỉnh của ngọn núi cao, khung cảnh trải dài vô cùng hùng vĩ và thơ mộng. Mây trắng nhẹ nhàng len lỏi qua những đỉnh núi, tạo thành những hình dạng phong phú và thay đổi liên tục. Ánh nắng chiếu rọi qua lớp mây mỏng manh, tạo ra những bóng râm đầy huyền bí trên những thung lũng dưới chân núi.

Từ đỉnh núi, bạn có thể nhìn thấy cả một thung lũng xanh tươi mênh mông, với những dòng sông uốn khúc chảy qua những cánh rừng rậm màu xanh bạt ngàn. Các đỉnh núi xung quanh được phủ kín bởi rừng thông và cây cối rậm rạp, tạo nên một bức tranh thiên nhiên hùng vĩ và hoang sơ.

Trời trong vắt, không gian rộng lớn trải dài vô tận. Cơn gió mát lành từ các dãy núi xa xôi thổi qua, mang theo hương thơm của hoa và cây rừng. Dưới ánh nắng chiều, màu sắc của thiên nhiên trở nên ấm áp và lãng mạn hơn bao giờ hết.

Ở đây, âm thanh của tự nhiên là bài hát của các loài chim rừng hót líu lo, tiếng ve kêu vang khắp thung lũng, và tiếng nước chảy róc rách qua các ghềnh đá. Đây là một nơi nơi bạn có thể ngắm nhìn cảnh sắc tuyệt đẹp của trái đất và cảm nhận sự thanh bình và tĩnh lặng của tự nhiên hoang sơ.

Dưới bầu trời đầy sao, bạn có thể cảm nhận sự trầm mặc của vũ trụ, nhìn ngắm hàng ngàn ngôi sao lấp lánh như những viên ngọc quý. Đây là khoảnh khắc bạn nhận ra rằng mình là một phần của một vũ trụ rộng lớn và đầy bí ẩn.

Từ đỉnh núi này, mọi thứ dường như trở nên nhỏ bé và tạm thời, khiến bạn bị hút vào sự tuyệt vời của thiên nhiên và trải nghiệm cảm giác bình yên và đầy nghệ thuật mà chỉ tự nhiên mới có thể mang lại.
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;