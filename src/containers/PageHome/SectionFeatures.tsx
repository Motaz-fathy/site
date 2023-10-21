import rightImgPng from "images/our-features.png";
import { useTranslation } from "react-i18next";

const SectionFeatures = ({
  className = "",
  rightImg = rightImgPng,
  type = "type1"
}) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div
        className={` mx-4 mb-8 mt-20 flex h-auto flex-col items-center  py-12 rtl:gap-2  bg-[#1D4179] w-full
		max-sm:mb-10 max-sm:mb-[2px] max-sm:mt-[50px] max-sm:h-[800px] 
           `}
      >
        <div className="container flex flex-col  text-2xl text-white max-sm:mt-[300px] max-sm:pb-3 bg-[#1D4179] py-5 ">
          <h2 className="text-3xl font-extrabold tracking-wide">
            {t("featuresHeader")}
          </h2>
          <p className="mt-5 text-base font-thin text-white lg:w-3/4">
            {t("featuresDesc")}
          </p>
         
        </div>
    
	    <div className="container flex-col items-center gap-12 pt-5  text-white">
				<h2 className="xl:text-[24px]  max-sm:text-[20] font-[500]  pb-5">Why choose Teleferic? </h2>
                <h4 className="xl:text-[16px]  max-sm:text-[16] font-[500] ">1- We provide you with a variety of transportation options.</h4>
                <h4 className="xl:text-[16px]  max-sm:text-[16] font-[500] ">2- With us, there is no need to use many platforms and applications to book your trip because we provide you with everything you need in one platform</h4>
                <h4 className="xl:text-[16px]  max-sm:text-[16] font-[500] ">3- Your safety and comfort are our priority, so we partner with the largest reliable transportation companies</h4>
                <h4 className="xl:text-[16px]  max-sm:text-[16] font-[500] ">4- We are in constant contact with you and sending updates about your trip (flight date, cancellation, delay, etc.)</h4>
		</div>

        <div
          className="  flex  items-center justify-center gap-12 max-sm:flex-col  h-auto max-sm:gap-3 xl:translate-y-[120px] lg:translate-y-[120px] md:translate-y-[120px]"
        >
          {/* #1 */}
          <div className="flex w-[184px]  items-center justify-center gap-4 rounded-lg border border-gray-100 bg-white p-1 pt-12  max-sm:mt-[2px] lg:p-4">
            <div className="pt-2 text-center text-gray-500">
              <div className="mx-auto w-fit bg-[#FFF7EA]">
                <svg
                  width="56"
                  height="75"
                  viewBox="0 0 56 57"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="bg-white"
                >
                  <path
                    d="M18.184 16.7542C16.4521 16.7542 15.043 18.1633 15.043 19.8952C15.043 21.6272 16.4521 23.0363 18.184 23.0363C19.916 23.0363 21.3251 21.6272 21.3251 19.8952C21.3251 18.1633 19.916 16.7542 18.184 16.7542ZM18.184 21.2864C17.417 21.2864 16.793 20.6623 16.793 19.8953C16.793 19.1284 17.417 18.5043 18.184 18.5043C18.9511 18.5043 19.5751 19.1284 19.5751 19.8953C19.5751 20.6623 18.951 21.2864 18.184 21.2864ZM19.8759 9.26924L10.3316 22.5545C10.0504 22.9453 9.50555 23.034 9.11476 22.7528C8.72396 22.4716 8.63526 21.9268 8.91646 21.536L18.4609 8.25074C18.7421 7.85994 19.2869 7.77124 19.6776 8.05244C20.0684 8.33375 20.1571 8.87855 19.8759 9.26924ZM13.7414 10.8121C13.7414 9.08013 12.3324 7.67094 10.6004 7.67094C8.86844 7.67094 7.45937 9.08002 7.45937 10.8121C7.45937 12.544 8.86834 13.9531 10.6004 13.9531C12.3324 13.9531 13.7414 12.544 13.7414 10.8121ZM9.20937 10.8121C9.20937 10.045 9.83346 9.42094 10.6004 9.42094C11.3673 9.42094 11.9914 10.045 11.9914 10.8121C11.9914 11.5791 11.3674 12.2031 10.6004 12.2031C9.83335 12.2031 9.20937 11.579 9.20937 10.8121ZM54.8724 24.3786L52.7497 12.9629C52.4859 11.5453 52.0131 9.94003 50.505 8.78307C49.0856 7.69424 47.5207 7.59372 46.143 7.67947L41.3901 2.39579C40.7429 1.67632 39.8894 1.29602 38.9217 1.29602H4.38746C2.55674 1.29602 1.06738 2.78538 1.06738 4.6161V26.0912C1.06738 27.9219 2.55685 29.4113 4.38746 29.4113H16.9618L10.915 37.2932C9.80076 38.7457 10.0759 40.834 11.5282 41.9484L28.567 55.0199C29.1684 55.4813 29.8788 55.7044 30.584 55.7044C31.5819 55.7044 32.5691 55.2575 33.2221 54.4064L54.2424 27.0066C54.8315 26.2387 55.0494 25.33 54.8724 24.3786ZM4.38746 27.6613C3.52165 27.6613 2.81738 26.957 2.81738 26.0912V4.6161C2.81738 3.75029 3.52176 3.04602 4.38746 3.04602H38.9217C39.3925 3.04602 39.7743 3.2161 40.0891 3.5661L43.9424 7.84977L34.3105 8.60413C33.3458 8.6796 32.5245 9.12541 31.9354 9.89322L18.3043 27.6613H4.38746ZM52.854 25.9413L31.8338 53.3412C31.3068 54.0283 30.3193 54.1585 29.6323 53.6313L12.5936 40.5599C11.9068 40.0329 11.7767 39.0452 12.3036 38.3583L33.3239 10.9584C33.6105 10.5849 33.9779 10.3855 34.4471 10.3488L46.0228 9.44216C47.2141 9.34897 48.4572 9.41766 49.4398 10.1715C50.2772 10.8139 50.7376 11.7153 51.0292 13.2829L53.152 24.6984C53.2381 25.1613 53.1406 25.5678 52.854 25.9413ZM47.1078 13.2112C45.7307 12.1549 43.7508 12.4156 42.6942 13.7928C41.6376 15.1699 41.8985 17.1499 43.2756 18.2065C44.6358 19.25 46.6474 18.983 47.6894 17.6249C48.7458 16.2478 48.4849 14.2678 47.1078 13.2112ZM46.3009 16.5597C45.8375 17.1637 44.944 17.2808 44.3409 16.818C43.7369 16.3544 43.6195 15.4617 44.0827 14.858C44.3577 14.4995 44.7733 14.3114 45.1935 14.3114C46.3218 14.3115 46.9953 15.6547 46.3009 16.5597ZM45.729 24.1965L42.8845 27.9054C42.5919 28.2886 42.0441 28.3621 41.6608 28.0695L34.1064 22.2758C33.7233 21.9832 33.6498 21.4353 33.9423 21.0521C34.2349 20.669 34.7828 20.5955 35.1659 20.888L42.0292 26.1516L44.3413 23.1369C44.6339 22.7538 45.1817 22.6803 45.565 22.9728C45.9482 23.2654 46.0216 23.8134 45.729 24.1965ZM29.0611 40.6518C29.0611 40.6518 25.2168 37.7035 25.2156 37.7026C23.8525 36.6572 21.7632 36.9325 20.7153 38.2989L19.293 40.1533C19.0004 40.5365 19.0739 41.0845 19.457 41.377L27.0115 47.1707C27.3946 47.4633 27.9426 47.3898 28.2351 47.0067C28.2351 47.0067 29.6558 45.1543 29.6575 45.1522C30.6962 43.7977 30.4084 41.685 29.0611 40.6518ZM28.2698 44.0926L27.3799 45.2528L21.211 40.5216C21.211 40.5216 22.103 39.3584 22.1031 39.3584C22.5824 38.7334 23.5232 38.6047 24.1562 39.0902C24.1562 39.0902 28.0014 42.0392 28.0017 42.0394C28.6267 42.5188 28.7556 43.4592 28.2698 44.0926ZM35.8093 37.1309L32.9647 40.8398C32.6722 41.2229 32.1243 41.2964 31.7411 41.0038L24.1866 35.2101C23.8035 34.9176 23.73 34.3697 24.0226 33.9865L26.8671 30.2775C27.1597 29.8944 27.7075 29.8209 28.0908 30.1135C28.4739 30.4061 28.5474 30.9539 28.2548 31.3372L25.9405 34.3548L28.3323 36.1892L29.8145 34.2564C30.1071 33.8732 30.655 33.7997 31.0382 34.0923C31.4214 34.3849 31.4949 34.9328 31.2023 35.316L29.7177 37.2517L32.1095 39.0861L34.4216 36.0714C34.7142 35.6882 35.2621 35.6147 35.6453 35.9073C36.0284 36.1998 36.1018 36.7476 35.8093 37.1309ZM40.8088 28.886L31.3958 25.5156L31.395 25.5178C31.1398 25.427 30.8461 25.4559 30.6062 25.6215C30.2098 25.8951 30.1103 26.4385 30.384 26.8349L36.08 35.052C36.3536 35.4484 36.897 35.5479 37.2934 35.2741C37.6897 35.0005 37.7893 34.4571 37.5155 34.0607L36.1523 32.0939L37.9679 29.7265L40.2209 30.5333C40.6758 30.6956 41.1762 30.4585 41.3386 30.0035C41.5009 29.5487 41.2638 29.0483 40.8088 28.886ZM35.1077 30.5871L33.3701 28.0803L36.2416 29.1085L35.1077 30.5871Z"
                    fill="#FFB229"
                  />
                </svg>
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-[#FFB229]">
                {t("feature1")}
              </p>
            </div>
          </div>
          {/* #2 */}
          <div className="flex w-[184px]  items-center  justify-center gap-4 rounded-lg border border-gray-100 bg-white p-1 pt-12  max-sm:mt-[2px] lg:p-4">
            <div className="pt-2 text-center text-gray-500">
              <div className="mx-auto w-fit bg-[#FFF7EA]">
                <svg
                  width="56"
                  height="75"
                  viewBox="0 0 56 57"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="bg-white"
                >
                  <g clip-path="url(#clip0_552_5407)">
                    <path
                      d="M55.4691 53.4534L41.0108 39.2261C44.797 35.1126 47.1234 29.6723 47.1234 23.6859C47.1215 10.8799 36.5736 0.5 23.561 0.5C10.5484 0.5 0.000488281 10.8799 0.000488281 23.6859C0.000488281 36.4919 10.5484 46.8718 23.561 46.8718C29.1833 46.8718 34.34 44.9271 38.3905 41.6941L52.9049 55.9774C53.6121 56.6741 54.7603 56.6741 55.4675 55.9774C56.1764 55.2808 56.1764 54.1501 55.4691 53.4534ZM23.561 43.3045C12.551 43.3045 3.62561 34.521 3.62561 23.6859C3.62561 12.8508 12.551 4.06729 23.561 4.06729C34.5711 4.06729 43.4964 12.8508 43.4964 23.6859C43.4964 34.521 34.5711 43.3045 23.561 43.3045Z"
                      fill="#FFB229"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_552_5407">
                      <rect
                        width="56"
                        height="56"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-[#FFB229]">
                {t("feature2")}
              </p>
            </div>
          </div>
          {/* #3 */}
          <div className=" flex w-[180px]  items-center justify-center gap-4 rounded-lg border border-gray-100 bg-white p-1 pt-12  max-sm:mt-[2px] lg:p-4">
            <div className="pt-2 text-center text-gray-500">
              <div className="mx-auto w-fit bg-[#FFF7EA]">
                <svg
                  width="56"
                  height="75"
                  viewBox="0 0 56 57"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="bg-white"
                >
                  <path
                    d="M44.4842 2.19531H11.5159C5.166 2.19531 0 7.36131 0 13.7112C0 20.0611 5.166 25.2271 11.5159 25.2271H19.9009V34.5308L19.4915 34.1874C17.4677 32.4891 14.3009 32.6272 12.4327 34.4956C10.4748 36.4534 10.603 39.565 12.732 41.3513L19.9008 47.3667V53.1641C19.9008 54.0701 20.6353 54.8047 21.5414 54.8047H41.2289C42.135 54.8047 42.8695 54.0701 42.8695 53.1641V34.7282C42.8695 32.2502 41.0152 30.1505 38.5561 29.8441L29.7445 28.7463V25.2268H44.4842C50.8341 25.2268 56 20.0608 56 13.711C56 7.36109 50.8341 2.19531 44.4842 2.19531ZM23.182 51.5234V48.2422H39.5883V51.5234H23.182ZM38.1505 33.1002C38.9702 33.2024 39.5884 33.9023 39.5884 34.7282V44.9609H22.1386L14.8411 38.8377C14.1934 38.2942 14.1541 37.4145 14.7528 36.8157C15.4253 36.1433 16.654 36.0898 17.3824 36.7009L20.4869 39.3059C21.5518 40.1993 23.1821 39.4414 23.1821 38.0491V17.0703C23.1821 16.1657 23.9181 15.4297 24.8228 15.4297C25.7274 15.4297 26.4634 16.1657 26.4634 17.0703V30.1953C26.4634 31.023 27.0799 31.721 27.9012 31.8234L38.1505 33.1002ZM44.4842 21.9457H29.7445V17.0703C29.7445 14.3564 27.5366 12.1484 24.8227 12.1484C22.1087 12.1484 19.9008 14.3564 19.9008 17.0703V21.9457H11.5158C6.97528 21.9457 3.28125 18.2517 3.28125 13.7112C3.28125 9.1707 6.97528 5.47656 11.5159 5.47656H44.4842C49.0247 5.47656 52.7188 9.17059 52.7188 13.7112C52.7188 18.2518 49.0247 21.9457 44.4842 21.9457Z"
                    fill="#FFB229"
                  />
                  <path
                    d="M43.235 9.23843L37.8326 14.6408L35.7114 12.5197C35.0707 11.879 34.0319 11.879 33.3912 12.5197C32.7505 13.1604 32.7505 14.1991 33.3912 14.8399L36.6724 18.1211C37.313 18.7618 38.3519 18.7619 38.9926 18.1211L45.5551 11.5586C46.1958 10.9179 46.1958 9.87915 45.5551 9.23843C44.9145 8.59761 43.8757 8.59761 43.235 9.23843Z"
                    fill="#FFB229"
                  />
                </svg>
              </div>
              <p className="mt-4   text-center text-sm font-semibold text-[#FFB229]">
                {t("feature3")}
              </p>
            </div>
          </div>
          {/* #4 */}
          <div className="my-[4px] flex w-[180px]  items-center justify-center gap-4 rounded-lg border border-gray-100 bg-white p-1  pt-12 lg:p-4">
            <div className="pt-2 text-center text-gray-500">
              <div className="mx-auto w-fit bg-[#FFF7EA]">
                <svg
                  width="56"
                  height="75"
                  viewBox="0 0 56 57"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="bg-white"
                >
                  <path
                    d="M28 3.88721L7 11.5247V28.5C7 47.6816 27.3779 52.8992 27.583 52.9504L28 53.0513L28.417 52.9504C28.6221 52.8992 49 47.6816 49 28.5V11.5247L28 3.88721ZM45.5 28.5C45.5 43.6877 30.7839 48.637 28.0068 49.4351C25.3289 48.6421 10.5 43.5579 10.5 28.5V13.9753L28 7.61279L45.5 13.9753V28.5Z"
                    fill="#FFB229"
                  />
                  <path
                    d="M18.7373 27.2627L16.2627 29.7373L24.5 37.9746L39.7373 22.7373L37.2627 20.2627L24.5 33.0254L18.7373 27.2627Z"
                    fill="#FFB229"
                  />
                </svg>
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-[#FFB229]">
                {t("feature4")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default SectionFeatures;
