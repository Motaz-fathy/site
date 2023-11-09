import { DEMO_POSTS } from "data/posts";
import { PostDataType } from "data/types";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Comment from "shared/Comment/Comment";
import NcImage from "shared/NcImage/NcImage";
import SocialsList from "shared/SocialsList/SocialsList";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Hero from "images/terms.jpg";

const Faqs = () => {
	const { t } = useTranslation();
	const renderHeader = () => {
		return (
			<header className="container rounded-xl">
				<div className="mx-auto max-w-screen-md space-y-5">
					<span className=" max-w-4xl text-3xl font-semibold text-neutral-900 dark:text-neutral-100 md:text-4xl md:!leading-[120%] lg:text-4xl ">
						الأسئلة الشائعة لشركة تلفريك
					</span>
				</div>
			</header>
		);
	};

	const renderContent = () => {
		return (
			<div
				id="single-entry-content"
				className="dark:prose-dark prose-sm prose mx-auto !max-w-screen-md dark:prose-invert sm:prose lg:prose-lg"
			>
				<div>
					<span className=" max-w-4xl text-xl font-semibold text-neutral-900 dark:text-neutral-100 md:text-3xl md:!leading-[120%] lg:text-2xl ">
						هل أنا بحاجة للتسجيل لاستخدام تلفريك؟
					</span>

					<p>
						لا تحتاج الى التسجيل عند استكشاف رحلاتنا واتجاهاتنا واسعارنا
						وإمكانية الحجز على أي من الرحلات المختارة ولكن تحتاج الى التسجيل عند
						قيامك بالحجز على أي من الرحلات وذلك لعمل حساب خاص بك يمكنك من خلاله
						الاطلاع على سجل الرحلات التي قمت بها من خلال حسابك كما يتيح لنا
						التواصل معكم.
					</p>
					<span className=" max-w-4xl text-xl font-semibold text-neutral-900 dark:text-neutral-100 md:text-3xl md:!leading-[120%] lg:text-2xl ">
						فقدت تذكرتي. ماذا يجب ان افعل الان؟{" "}
					</span>

					<p>
						يتم التوجه الى محطة الاركاب حيث يتم مراجعه الرحلة في اخر محطة ويتم
						عمل إيصال أركاب للعميل بمبلغ مالي محدد لكل تذكرة (طبقا لسياسة الشركة
						التي يتم الحجز من خلالها)
					</p>
					<span className=" max-w-4xl text-xl font-semibold text-neutral-900 dark:text-neutral-100 md:text-3xl md:!leading-[120%] lg:text-2xl ">
						هل هو إجباري اتخاذ نسخة مطبوعة من التذكرة؟{" "}
					</span>

					<p>
						ليس هناك حاجة للحصول على نسخة مطبوعة من التذكرة عند الدفع بنظام
						بطاقة الائتمان حيث ان بيانات الحجز مسجلة حيث يمكنك التواجد مباشرة
						الى الرحلة الخاصة بك. وعند ذهابك لمحطه الركوب تعرض الحجز الالكتروني
						على هاتفك وسيعطيك الموظف تذكرتك المطبوعة
					</p>
					<span className=" max-w-4xl text-xl font-semibold text-neutral-900 dark:text-neutral-100 md:text-3xl md:!leading-[120%] lg:text-2xl ">
						هل الحجز عبر الإنترنت أغلي سعرا؟{" "}
					</span>

					<p>
						الحجز عبر الانترنت بنفس السعر. بل وعلى العكس الحجز عبر الانترنت يتيح
						لك التمتع بالعروض الخاصة المقدمة لمستخدمي التطبيق والمتاحة للسادة
						العملاء في فترات متقاربة وتصل الخصومات ل ١٠ ٪ على الأسعار مقارنه
						بأسعار الشركات نفسها
					</p>
					<span className=" max-w-4xl text-xl font-semibold text-neutral-900 dark:text-neutral-100 md:text-3xl md:!leading-[120%] lg:text-2xl ">
						ما هي مزايا شراء تذكرة ذهاب وعوده؟{" "}
					</span>

					<p>
						عند شراء تذكرة الذهاب والعودة معا يتيح لك فرصة الحصول على خصم على
						أسعار التذاكر يبدا من 10 جنيهات فأكثر ويتيح أيضا ضمان الحصول على
						تذاكر العودة والحصول بدون عناء. كما يتيح لك نظام الحجز التمتع بالخصم
						الخاص بالذهاب والعودة حتى دون تحديد ميعاد العودة (عودة مفتوحة) حيث
						يمكنك عزيزي العميل تأكيد العودة في أي وقت وعلى أي خدمة عند التأكد من
						ميعاد عودتك من خلال مكاتبنا (طبقا لسياسة الشركة التي يتم الحجز من
						خلالها)
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="nc-PageSingle pt-8 lg:pt-16 ">
			<Helmet>
				<title>Faqs || Telefreik For Booking</title>
			</Helmet>
			{renderHeader()}
			

			<div className="nc-SingleContent container space-y-10">
				{renderContent()}
			</div>
		</div>
	);
};

export default Faqs;
