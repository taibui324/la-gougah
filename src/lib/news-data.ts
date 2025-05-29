export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  image: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    slug: "ra-mat-san-pham-moi",
    title: "Ra mắt sản phẩm mới",
    date: "15/04/2025",
    description:
      "La Gougah vừa ra mắt dòng sản phẩm nước khoáng mới với thiết kế chai thân thiện với môi trường.",
    content: `
      <p>La Gougah vừa chính thức ra mắt dòng sản phẩm nước khoáng mới với thiết kế chai hoàn toàn mới, được làm từ vật liệu thân thiện với môi trường và có thể tái chế 100%.</p>
      
      <p>Dòng sản phẩm mới này không chỉ giữ nguyên chất lượng nước khoáng thiên nhiên từ nguồn nước sâu tại cao nguyên Lâm Đồng mà còn thể hiện cam kết mạnh mẽ của La Gougah trong việc bảo vệ môi trường và giảm thiểu rác thải nhựa.</p>
      
      <p>Thiết kế chai mới với kiểu dáng hiện đại, tinh tế hơn, nhẹ hơn 25% so với thiết kế cũ nhưng vẫn đảm bảo độ bền và tiện lợi khi sử dụng. Đặc biệt, nút chai được thiết kế gắn liền với thân chai, góp phần giảm thiểu khả năng thất lạc và trở thành rác thải nhựa.</p>
      
      <p>Bên cạnh đó, La Gougah cũng giới thiệu hệ thống nhận diện thương hiệu mới trên bao bì sản phẩm, với hình ảnh núi non và dòng nước tinh khiết, thể hiện rõ nét nguồn gốc tự nhiên của sản phẩm.</p>
      
      <p>Dòng sản phẩm mới của La Gougah sẽ được phân phối rộng rãi trên toàn quốc từ tháng 5/2025, với nhiều chương trình khuyến mãi hấp dẫn dành cho người tiêu dùng.</p>
    `,
    image: "/images/image-6.png",
  },
  {
    id: 2,
    slug: "chuong-trinh-bao-ve-moi-truong",
    title: "Chương trình bảo vệ môi trường",
    date: "28/03/2025",
    description:
      "La Gougah khởi động chiến dịch bảo vệ nguồn nước sạch tại các vùng núi cao Việt Nam.",
    content: `
      <p>La Gougah vừa chính thức khởi động chiến dịch "Nguồn nước sạch cho tương lai" nhằm bảo vệ các nguồn nước tại các vùng núi cao Việt Nam, đặc biệt là khu vực cao nguyên Lâm Đồng - nơi có nguồn nước khoáng thiên nhiên của La Gougah.</p>
      
      <p>Chiến dịch này bao gồm nhiều hoạt động thiết thực như trồng rừng đầu nguồn, xây dựng hệ thống lọc nước sạch cho các trường học và cộng đồng địa phương, tổ chức các buổi tuyên truyền nâng cao nhận thức về bảo vệ nguồn nước cho người dân địa phương.</p>
      
      <p>Trong giai đoạn đầu tiên của chiến dịch, La Gougah sẽ triển khai trồng 10.000 cây xanh tại các khu vực đầu nguồn nước quan trọng, đồng thời xây dựng 20 hệ thống lọc nước sạch tại các trường học vùng cao, mang đến nguồn nước sạch cho hơn 5.000 học sinh.</p>
      
      <p>Bên cạnh đó, La Gougah cũng phối hợp với các chuyên gia môi trường để nghiên cứu và phát triển các giải pháp bền vững trong việc khai thác và sử dụng nguồn nước, đảm bảo cân bằng giữa hoạt động sản xuất kinh doanh và bảo vệ tài nguyên thiên nhiên.</p>
      
      <p>Chiến dịch "Nguồn nước sạch cho tương lai" sẽ được triển khai trong vòng 3 năm, với tổng ngân sách dự kiến lên đến 10 tỷ đồng, thể hiện cam kết lâu dài của La Gougah trong việc bảo vệ môi trường và phát triển bền vững.</p>
    `,
    image: "/images/image-7.png",
  },
  {
    id: 3,
    slug: "hop-tac-cung-phat-trien",
    title: "Hợp tác cùng phát triển",
    date: "10/03/2025",
    description:
      "La Gougah ký kết hợp tác với các đối tác chiến lược để mở rộng thị trường trong nước và quốc tế.",
    content: `
      <p>La Gougah vừa chính thức ký kết thỏa thuận hợp tác chiến lược với nhiều đối tác lớn trong và ngoài nước, đánh dấu bước ngoặt quan trọng trong chiến lược mở rộng thị trường của công ty.</p>
      
      <p>Theo thỏa thuận, La Gougah sẽ trở thành nhà cung cấp nước uống chính thức cho chuỗi khách sạn và khu nghỉ dưỡng cao cấp hàng đầu Việt Nam, đồng thời mở rộng kênh phân phối tại các thị trường quốc tế tiềm năng như Nhật Bản, Hàn Quốc và Singapore.</p>
      
      <p>Bên cạnh đó, La Gougah cũng hợp tác với các đối tác công nghệ để ứng dụng các giải pháp số hóa trong quy trình sản xuất và phân phối, nâng cao hiệu quả hoạt động và trải nghiệm khách hàng.</p>
      
      <p>Đặc biệt, trong khuôn khổ hợp tác, La Gougah và các đối tác sẽ cùng triển khai các dự án nghiên cứu và phát triển sản phẩm mới, đáp ứng nhu cầu ngày càng đa dạng của người tiêu dùng trong và ngoài nước.</p>
      
      <p>Việc ký kết hợp tác với các đối tác chiến lược không chỉ giúp La Gougah mở rộng thị trường mà còn khẳng định vị thế và uy tín của thương hiệu nước khoáng Việt Nam trên trường quốc tế.</p>
    `,
    image: "/images/image-8.png",
  },
];

// Function to get all news slugs for static generation
export function getAllNewsSlugs() {
  return newsItems.map((item) => ({
    params: {
      slug: item.slug,
    },
  }));
}

// Function to get news item by slug
export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}
