import HelpCard from "@/components/Card/HelpCard/HelpCard";
import React from "react";

const HelpPage = () => {
  return (
    <div className="flex mt-5">
      <div className="flex justify-between gap-5 flex-wrap">
        <HelpCard
          title={"Як переглянути інформацію про свої списки?"}
          text={
            "Упевніться, що ви зайшли у свій аккаунт на сайті. Після цього ви зможете переглянути інформацію про свої списки в розділі \"Мої списки\". Або ж ви можете перевірити свої списки у мобільному застосунку, увійшовши у свій аккаунт."
          }
        />
        <HelpCard
          title={"Де знайти ваш мобільний застосунок?"}
          text={
            "Наш мобільний застосунок можна знайти на головній сторінці сайту. Натисніть на кнопку \"Завантажити застосунок\", щоб перейти до завантаження та встановлення."
          }
        />
        <HelpCard
          title={"Як додати більше друзів?"}
          text={
            "Щоб додати більше друзів, придбайте преміум підписку. Преміум підписка надає можливість розширити список ваших друзів та користуватися іншими ексклюзивними функціями. Ви можете оформити преміум підписку у відповідному розділі \"Преміум\"."
          }
        />
        <HelpCard
          title={"Чи можна подарувати преміум підписку другу?"}
          text={
            "Так, ви можете подарувати преміум підписку другу. Для цього зайдіть на профіль вашого друга та натисніть на кнопку \"Подарувати\". Дотримуйтесь інструкцій на екрані, щоб завершити покупку та зробити приємний сюрприз."
          }
        />
        <HelpCard
          title={"Як залишити комментарій під кінофільмом?"}
          text={
            "Щоб залишити коментар під кінофільмом, перейдіть до самого низу сторінки з інформацією про кінофільм. Там ви знайдете секцію для коментарів, де зможете написати та опублікувати свій відгук."
          }
        />
        <HelpCard
          title={"Як змінити фото профілю?"}
          text={
            "Щоб змінити фото профілю, перейдіть до налаштувань профілю у вашому акаунті. Там ви зможете завантажити нове зображення. Якщо ви хочете встановити анімований аватар, ця функція доступна лише для користувачів з преміум підпискою. Ви можете придбати преміум підписку у відповідному розділі налаштувань."
          }
        />
        <HelpCard
          title={"Чи можна завантажити застосунок на iOS?"}
          text={
            "На жаль, на даний момент наш застосунок недоступний для завантаження на iOS. Ми активно працюємо над розробкою версії для цієї платформи. Щоб бути в курсі останніх новин та оновлень, будь ласка, стежте за інформацією на нашій сторінці \"Оновлення\". Там ви знайдете актуальні відомості про розвиток та випуск нових версій застосунку."
          }
        />
        <HelpCard
          title={"Чи залишилися ще питання?"}
          text={
            "Якщо у вас залишилися питання, слідкуйте за оновленнями у відділі \"Оновлення\". Там ви знайдете найсвіжішу інформацію та відповіді на ваші запитання."
          }
        />
        <HelpCard
          title={"Чи залишилися ще питання?"}
          text={
            "Якщо у вас залишилися питання, слідкуйте за оновленнями у відділі \"Оновлення\". Там ви знайдете найсвіжішу інформацію та відповіді на ваші запитання."
          }
        />
      </div>
    </div>
  );
};

export default HelpPage;

// import HelpCard from "@/components/Card/HelpCard/HelpCard";
// import React from "react";

// const HelpPage = () => {
//     return (
//         <div className="flex gap-5 mt-5 justify-center">
//             <div className="grid grid-cols-3 gap-5">
//                 <HelpCard
//                     title={"Helpcard 1"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe in nemo veritatis architecto, distinctio quasi unde ipsa sequi error quae aperiam iste. Neque, aliquam unde."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 2"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vitae hic aperiam reprehenderit optio est?"}
//                 />
//                 <HelpCard
//                     title={"Helpcard 222"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, inventore."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 222"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, inventore."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 222"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, inventore."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 222"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, inventore."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 222"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, inventore."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 1"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe in nemo veritatis architecto, distinctio quasi unde ipsa sequi error quae aperiam iste. Neque, aliquam unde."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 1"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe in nemo veritatis architecto, distinctio quasi unde ipsa sequi error quae aperiam iste. Neque, aliquam unde."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 1"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe in nemo veritatis architecto, distinctio quasi unde ipsa sequi error quae aperiam iste. Neque, aliquam unde."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 1"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe in nemo veritatis architecto, distinctio quasi unde ipsa sequi error quae aperiam iste. Neque, aliquam unde."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 1"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe in nemo veritatis architecto, distinctio quasi unde ipsa sequi error quae aperiam iste. Neque, aliquam unde."}
//                 />
//                 <HelpCard
//                     title={"Helpcard 2"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vitae hic aperiam reprehenderit optio est?"}
//                 />
//                 <HelpCard
//                     title={"Helpcard 2"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vitae hic aperiam reprehenderit optio est?"}
//                 />
//                 <HelpCard
//                     title={"Helpcard 1"}
//                     text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe in nemo veritatis architecto, distinctio quasi unde ipsa sequi error quae aperiam iste. Neque, aliquam unde."}
//                 />
//             </div>
//         </div>
//     );
// };

// export default HelpPage;
