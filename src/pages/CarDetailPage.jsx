// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   ArrowLeft,
//   Calendar,
//   Gauge,
//   Fuel,
//   Cog,
//   Car,
//   Palette,
//   Zap,
//   MapPin,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import Header from "@/components/landing/Header";
// import Footer from "@/components/landing/Footer";
// import api from "@/lib/api";

// function formatPrice(p) {
//   return new Intl.NumberFormat("ru-RU").format(p);
// }

// export default function CarDetailPage() {
//   const { id } = useParams();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   useEffect(() => {
//     api
//       .getCar(id)
//       .then(setCar)
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [id]);

//   useEffect(() => {
//     setActiveImageIndex(0);
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="page-container">
//         <Header />
//         <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12">
//           <div className="animate-pulse h-[500px] bg-brand-surface" />
//         </div>
//       </div>
//     );
//   }

//   if (!car) {
//     return (
//       <div className="page-container">
//         <Header />
//         <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12 text-center">
//           <h1 className="font-heading text-3xl font-bold mb-4">
//             Автомобиль не найден
//           </h1>
//           <Link
//             to="/catalog"
//             className="text-brand-gold hover:text-brand-gold-hover"
//           >
//             Вернуться в каталог
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const carImages = Array.from(
//     new Set(
//       [...(Array.isArray(car.images) ? car.images : []), car.image_url].filter(
//         Boolean,
//       ),
//     ),
//   ).slice(0, 3);

//   const activeImage = carImages[activeImageIndex] || car.image_url;

//   const goToPrevImage = () => {
//     setActiveImageIndex((current) =>
//       current === 0 ? carImages.length - 1 : current - 1,
//     );
//   };

//   const goToNextImage = () => {
//     setActiveImageIndex((current) =>
//       current === carImages.length - 1 ? 0 : current + 1,
//     );
//   };

//   const specs = [
//     { icon: Calendar, label: "Год выпуска", value: car.year },
//     { icon: Gauge, label: "Пробег", value: `${formatPrice(car.mileage)} км` },
//     { icon: Fuel, label: "Двигатель", value: car.engine },
//     { icon: Cog, label: "Коробка", value: car.transmission },
//     { icon: Zap, label: "Мощность", value: car.power },
//     { icon: Car, label: "Кузов", value: car.body_type },
//     { icon: Palette, label: "Цвет", value: car.color },
//     { icon: MapPin, label: "Привод", value: car.drive_type },
//   ].filter((s) => s.value);

//   return (
//     <div className="page-container" data-testid="car-detail-page">
//       <Header />
//       <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-12">
//         <Link
//           to="/catalog"
//           data-testid="back-to-catalog"
//           className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-brand-gold transition-colors mb-8"
//         >
//           <ArrowLeft size={16} /> Назад в каталог
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           <motion.div
//             className="lg:col-span-7"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="relative overflow-hidden bg-brand-surface">
//               {activeImage && (
//                 <img
//                   src={activeImage}
//                   alt={`${car.brand} ${car.model}`}
//                   className="w-full h-[350px] md:h-[500px] object-cover"
//                   data-testid="car-detail-image"
//                 />
//               )}

//               {carImages.length > 1 && (
//                 <>
//                   <button
//                     type="button"
//                     onClick={goToPrevImage}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
//                     data-testid="car-image-prev"
//                     aria-label="Предыдущее фото"
//                   >
//                     <ChevronLeft size={24} />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={goToNextImage}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
//                     data-testid="car-image-next"
//                     aria-label="Следующее фото"
//                   >
//                     <ChevronRight size={24} />
//                   </button>

//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                     {carImages.map((_, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => setActiveImageIndex(index)}
//                         className={`w-2.5 h-2.5 rounded-full transition-colors ${
//                           index === activeImageIndex
//                             ? "bg-brand-gold"
//                             : "bg-white/50 hover:bg-white"
//                         }`}
//                         data-testid={`car-image-dot-${index}`}
//                         aria-label={`Фото ${index + 1}`}
//                       />
//                     ))}
//                   </div>
//                 </>
//               )}

//               <div className="absolute top-4 left-4 flex gap-2">
//                 {car.is_from_europe && (
//                   <span className="bg-brand-gold text-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
//                     Из Европы
//                   </span>
//                 )}
//                 {car.is_commission && (
//                   <span className="bg-brand-blue text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
//                     Комиссия
//                   </span>
//                 )}
//               </div>
//             </div>

//             {carImages.length > 1 && (
//               <div
//                 className="grid grid-cols-3 gap-3 mt-3"
//                 data-testid="car-image-thumbnails"
//               >
//                 {carImages.map((url, index) => (
//                   <button
//                     key={url}
//                     type="button"
//                     onClick={() => setActiveImageIndex(index)}
//                     className={`border overflow-hidden transition-colors ${
//                       index === activeImageIndex
//                         ? "border-brand-gold"
//                         : "border-white/10 hover:border-white/30"
//                     }`}
//                     data-testid={`car-image-thumb-${index}`}
//                   >
//                     <img
//                       src={url}
//                       alt={`Фото ${index + 1}`}
//                       className="w-full h-24 object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </motion.div>

//           <motion.div
//             className="lg:col-span-5"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.15 }}
//           >
//             <p
//               className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-gold mb-2"
//               data-testid="car-detail-brand"
//             >
//               {car.brand}
//             </p>
//             <h1
//               className="font-heading text-3xl md:text-4xl font-black tracking-tight mb-4"
//               data-testid="car-detail-model"
//             >
//               {car.model}
//             </h1>
//             <div className="flex items-baseline gap-2 mb-6">
//               <span
//                 className="font-heading text-4xl font-black text-brand-gold"
//                 data-testid="car-detail-price"
//               >
//                 ${formatPrice(car.price)}
//               </span>
//             </div>

//             {car.fuel_type && (
//               <p className="text-sm text-zinc-400 mb-6">{car.fuel_type}</p>
//             )}

//             <div
//               className="grid grid-cols-2 gap-3 mb-8"
//               data-testid="car-specs-grid"
//             >
//               {specs.map((spec) => (
//                 <div
//                   key={spec.label}
//                   className="p-3 border border-white/10 bg-brand-surface"
//                 >
//                   <div className="flex items-center gap-2 mb-1">
//                     <spec.icon
//                       size={14}
//                       strokeWidth={1.5}
//                       className="text-brand-gold"
//                     />
//                     <span className="text-[10px] uppercase tracking-wider text-zinc-500">
//                       {spec.label}
//                     </span>
//                   </div>
//                   <p className="text-sm font-medium">{spec.value}</p>
//                 </div>
//               ))}
//             </div>

//             {car.description && (
//               <div className="mb-8" data-testid="car-detail-description">
//                 <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
//                   Описание
//                 </h3>
//                 <p className="text-sm text-zinc-300 leading-relaxed font-light">
//                   {car.description}
//                 </p>
//               </div>
//             )}

//             <div className="flex flex-col gap-3">
//               <a
//                 href="tel:+375336987799"
//                 data-testid="car-call-btn"
//                 className="btn-primary text-center"
//               >
//                 Позвонить
//               </a>
//               <Link
//                 to="/#contact"
//                 data-testid="car-inquiry-btn"
//                 className="btn-outline text-center"
//               >
//                 Оставить заявку
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Car,
  Palette,
  Zap,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import api from "@/lib/api";

function formatPrice(p) {
  return new Intl.NumberFormat("ru-RU").format(Number(p) || 0);
}

function getPriceUsd(car) {
  return car.price_usd ?? car.price ?? 0;
}

function getPriceByn(car) {
  return car.price_byn ?? 0;
}

export default function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api
      .getCar(id)
      .then(setCar)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12">
          <div className="animate-pulse h-[500px] bg-brand-surface" />
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="page-container">
        <Header />
        <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">
            Автомобиль не найден
          </h1>
          <Link
            to="/catalog"
            className="text-brand-gold hover:text-brand-gold-hover"
          >
            Вернуться в каталог
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const carImages = Array.from(
    new Set(
      [...(Array.isArray(car.images) ? car.images : []), car.image_url].filter(
        Boolean,
      ),
    ),
  ).slice(0, 3);

  const activeImage = carImages[activeImageIndex] || car.image_url;

  const goToPrevImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? carImages.length - 1 : current - 1,
    );
  };

  const goToNextImage = () => {
    setActiveImageIndex((current) =>
      current === carImages.length - 1 ? 0 : current + 1,
    );
  };

  const specs = [
    { icon: Calendar, label: "Год выпуска", value: car.year },
    { icon: Gauge, label: "Пробег", value: `${formatPrice(car.mileage)} км` },
    { icon: Fuel, label: "Двигатель", value: car.engine },
    { icon: Cog, label: "Коробка", value: car.transmission },
    { icon: Zap, label: "Мощность", value: car.power },
    { icon: Car, label: "Кузов", value: car.body_type },
    { icon: Palette, label: "Цвет", value: car.color },
    { icon: MapPin, label: "Привод", value: car.drive_type },
  ].filter((s) => s.value);

  return (
    <div className="page-container" data-testid="car-detail-page">
      <Header />
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <Link
          to="/catalog"
          data-testid="back-to-catalog"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-brand-gold transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Назад в каталог
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative overflow-hidden bg-brand-surface">
              {activeImage && (
                <img
                  src={activeImage}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-[350px] md:h-[500px] object-cover"
                  data-testid="car-detail-image"
                />
              )}

              {carImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    data-testid="car-image-prev"
                    aria-label="Предыдущее фото"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    data-testid="car-image-next"
                    aria-label="Следующее фото"
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {carImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          index === activeImageIndex
                            ? "bg-brand-gold"
                            : "bg-white/50 hover:bg-white"
                        }`}
                        data-testid={`car-image-dot-${index}`}
                        aria-label={`Фото ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="absolute top-4 left-4 flex gap-2">
                {car.is_from_europe && (
                  <span className="bg-brand-gold text-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Из Европы
                  </span>
                )}
                {car.is_commission && (
                  <span className="bg-brand-blue text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Комиссия
                  </span>
                )}
              </div>
            </div>

            {carImages.length > 1 && (
              <div
                className="grid grid-cols-3 gap-3 mt-3"
                data-testid="car-image-thumbnails"
              >
                {carImages.map((url, index) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`border overflow-hidden transition-colors ${
                      index === activeImageIndex
                        ? "border-brand-gold"
                        : "border-white/10 hover:border-white/30"
                    }`}
                    data-testid={`car-image-thumb-${index}`}
                  >
                    <img
                      src={url}
                      alt={`Фото ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p
              className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-gold mb-2"
              data-testid="car-detail-brand"
            >
              {car.brand}
            </p>
            <h1
              className="font-heading text-3xl md:text-4xl font-black tracking-tight mb-4"
              data-testid="car-detail-model"
            >
              {car.model}
            </h1>
            <div className="mb-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className="font-heading text-4xl font-black text-brand-gold"
                  data-testid="car-detail-price"
                >
                  {formatPrice(getPriceByn(car))} BYN
                </span>
                <span className="text-sm text-zinc-500">
                  ≈ ${formatPrice(getPriceUsd(car))}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                * Цена в долларах указана справочно.
              </p>
              {car.usd_rate && (
                <p className="text-[11px] text-zinc-600 mt-1">
                  Курс НБРБ: 1 USD = {Number(car.usd_rate).toFixed(4)} BYN
                  {car.usd_rate_date ? ` на ${car.usd_rate_date}` : ""}
                </p>
              )}
            </div>

            {car.fuel_type && (
              <p className="text-sm text-zinc-400 mb-6">{car.fuel_type}</p>
            )}

            <div
              className="grid grid-cols-2 gap-3 mb-8"
              data-testid="car-specs-grid"
            >
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="p-3 border border-white/10 bg-brand-surface"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <spec.icon
                      size={14}
                      strokeWidth={1.5}
                      className="text-brand-gold"
                    />
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                      {spec.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{spec.value}</p>
                </div>
              ))}
            </div>

            {car.description && (
              <div className="mb-8" data-testid="car-detail-description">
                <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
                  Описание
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {car.description}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <a
                href="tel:+375336987799"
                data-testid="car-call-btn"
                className="btn-primary text-center"
              >
                Позвонить
              </a>
              <Link
                to="/#contact"
                data-testid="car-inquiry-btn"
                className="btn-outline text-center"
              >
                Оставить заявку
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
