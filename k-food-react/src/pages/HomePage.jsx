// HomePage.jsx
import SearchBox from "../components/SearchBox";
import PromoCard from "../components/PromoCard";
import nemNuong from "../assets/nemNuong.png";
import mcdonald from "../assets/mcdonald.png";

function HomePage({ user }) {
  return (
    <>
      <SearchBox />
      <section className="promo">
        <h2>
          Ưu đãi K-Food tại <span style={{ color: "#00b14f" }}>Hà Nội</span>
        </h2>
        <div className="promo-list">
          <PromoCard
            imgSrc={nemNuong}
            title="Nem Nướng"
            category="Món Khác"
            rating="4.8"
            time="35 phút"
            distance="5.5 km"
          />
          <PromoCard
            imgSrc={mcdonald}
            title="McDonald's"
            category="Fastfood"
            rating="4.3"
            time="25 phút"
            distance="2.2 km"
          />
        </div>
      </section>
    </>
  );
}

export default HomePage;
