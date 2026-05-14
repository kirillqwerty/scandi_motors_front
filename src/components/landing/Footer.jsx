// import { Link } from "react-router-dom";
// import logo from "@/assets/logo/scandi_motors_logo.png";

// export default function Footer() {
//   return (
//     <footer data-testid="site-footer" className="border-t border-white/10 py-10">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           <div>
//             <Link to="/" className="flex items-center gap-3 mb-4">
//               <img src={logo} alt="Scandi Motors" className="h-10" />
//             </Link>
//             <p className="text-xs text-zinc-500 leading-relaxed">
//               Продажа и подбор автомобилей в Минске. Пригон из Европы, кредит, лизинг, комиссия.
//             </p>
//           </div>
//           <div>
//             <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3">Услуги</h4>
//             <div className="flex flex-col gap-2">
//               <Link to="/catalog" className="text-sm text-zinc-500 hover:text-brand-gold transition-colors">Каталог авто</Link>
//               <Link to="/europe" className="text-sm text-zinc-500 hover:text-brand-gold transition-colors">Пригон из Европы</Link>
//               <Link to="/credit" className="text-sm text-zinc-500 hover:text-brand-gold transition-colors">Кредит и лизинг</Link>
//               <Link to="/commission" className="text-sm text-zinc-500 hover:text-brand-gold transition-colors">Комиссия</Link>
//             </div>
//           </div>
//           <div>
//             <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3">Информация</h4>
//             <div className="flex flex-col gap-2">
//               <Link to="/articles" className="text-sm text-zinc-500 hover:text-brand-gold transition-colors">Статьи</Link>
//               <a href="/#contact" className="text-sm text-zinc-500 hover:text-brand-gold transition-colors">Контакты</a>
//             </div>
//           </div>
//           <div>
//             <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3">Контакты</h4>
//             <p className="text-sm text-zinc-500 mb-1">+375 (33) 698-77-99</p>
//             <p className="text-sm text-zinc-500 mb-1">scandimotorsby@gmail.com</p>
//             <p className="text-sm text-zinc-500">г. Минск, ул. Горецкого, 30</p>
//           </div>
//         </div>
//         <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
//           <p className="text-xs text-zinc-600">&copy; {new Date().getFullYear()} Scandi Motors. Все права защищены.</p>
//           <Link to="/admin" data-testid="admin-link" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Панель управления</Link>
//         </div>
//       </div>
//     </footer>
//   );
// }
import { Link } from "react-router-dom";
import logo from "@/assets/logo/scandi_motors_logo.png";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="border-t border-white/10 py-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Scandi Motors" className="h-10" />
            </Link>

            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Продажа и подбор автомобилей в Минске. Пригон из Европы, кредит,
              лизинг и комиссионная продажа автомобилей.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-4">
              Услуги
            </h4>

            <div className="flex flex-col gap-2">
              <Link
                to="/catalog"
                className="text-sm text-zinc-500 hover:text-brand-gold transition-colors"
              >
                Каталог авто
              </Link>

              <Link
                to="/europe"
                className="text-sm text-zinc-500 hover:text-brand-gold transition-colors"
              >
                Пригон из Европы
              </Link>

              <Link
                to="/credit"
                className="text-sm text-zinc-500 hover:text-brand-gold transition-colors"
              >
                Кредит и лизинг
              </Link>

              <Link
                to="/commission"
                className="text-sm text-zinc-500 hover:text-brand-gold transition-colors"
              >
                Комиссия
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-4">
              Информация
            </h4>

            <div className="flex flex-col gap-2">
              <Link
                to="/articles"
                className="text-sm text-zinc-500 hover:text-brand-gold transition-colors"
              >
                Статьи
              </Link>

              <a
                href="/#contact"
                className="text-sm text-zinc-500 hover:text-brand-gold transition-colors"
              >
                Контакты
              </a>

              <Link
                to="/privacy"
                className="text-sm text-zinc-500 hover:text-brand-gold transition-colors"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-4">
              Контакты
            </h4>

            <div className="flex flex-col gap-2">
              <a
                href="tel:+375336987799"
                className="text-sm text-zinc-500 hover:text-brand-gold transition-colors"
              >
                +375 (33) 698-77-99
              </a>

              <a
                href="mailto:scandimotorsby@gmail.com"
                className="text-sm text-zinc-500 hover:text-brand-gold transition-colors break-all"
              >
                scandimotorsby@gmail.com
              </a>

              <p className="text-sm text-zinc-500">
                г. Минск, ул. Горецкого, 30
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h5 className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                Юридическая информация
              </h5>

              <div className="space-y-1 text-xs text-zinc-600 leading-relaxed">
                <p>ООО «Сканди Моторс»</p>

                <p>УНП 193866357</p>

                <p>
                  Юридический адрес: г. Минск, ул. Скрыганова, дом 6, помещение
                  7
                </p>

                <p>Директор: Герасимец Максим Сергеевич</p>

                <p>
                  Свидетельство №193866357 выдано Минским горисполкомом 30
                  апреля 2025 г.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                Банковские реквизиты
              </h5>

              <div className="space-y-1 text-xs text-zinc-600 leading-relaxed break-words">
                <p>Р/с BY58 ALFA 3012 2G91 3900 1027 0000 в BYN</p>

                <p>ЗАО «Альфа-Банк»</p>

                <p>220013 Минск, ул. Сурганова, 43-47</p>

                <p>БИК ALFABY2X</p>

                <p>УНП 101541947</p>

                <p>ОКПО 37526626</p>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-700">
              &copy; {new Date().getFullYear()} Scandi Motors. Все права
              защищены.
            </p>

            <Link
              to="/admin"
              data-testid="admin-link"
              className="text-xs text-zinc-700 hover:text-zinc-400 transition-colors"
            >
              Панель управления
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
