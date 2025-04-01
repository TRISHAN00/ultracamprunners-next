import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-[1px] border-t-[#AD242F]">
      <div className="max-w-[1300px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 text-center md:text-left">
          {/* Company Info */}
          <div className="space-y-4 ">
            <Image
              src="https://ultracamprunners.com/wp-content/uploads/2024/09/1704712437.png"
              alt="Ultra Camp Runners Logo"
              width={150}
              height={50}
              className="h-12 w-auto mx-auto md:mx-0"
            />
            <p className="text-muted-foreground max-w-sm mx-auto md:mx-0">
              Established in 2019, Ultra Camp Runners is Dhaka&apos;s premier
              marathon organizer, hosting 8 successful events. We foster a
              culture of health and unity, inviting you to join our vibrant
              running community.
            </p>
            <p className="text-sm text-muted-foreground">
              Trade License No : TRAD/DNCC/034200/2023
            </p>
          </div>

          {/* Quick as */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick as</h3>
            <nav className="space-y-2">
              <Link
                href={"/"}
                className="block text-muted-foreground hover:text-primary w-fit"
              >
                Home
              </Link>
              <Link
                href={"/about-us"}
                className="block text-muted-foreground hover:text-primary w-fit"
              >
                About Us
              </Link>
              <Link
                href={"/ucr-events"}
                className="block text-muted-foreground hover:text-primary w-fit"
              >
                Events
              </Link>
              <Link
                href={"/shop"}
                className="block text-muted-foreground hover:text-primary w-fit"
              >
                Shop
              </Link>
              <Link
                href="/blog"
                className="block text-muted-foreground hover:text-primary w-fit"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-primary w-fit"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center md:text-start">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-[#AD242F] shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  K-166, South Badda, Gulshan, Dhaka-1212
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#AD242F]" />
                <Link
                  href="mailto:bd.ultracamprunners@gmail.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  bd.ultracamprunners@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#AD242F]" />
                <Link
                  href="tel:01886020826"
                  className="text-muted-foreground hover:text-primary"
                >
                  01886020826
                </Link>
              </div>

              {/* Social Media as */}
              <div className="flex gap-4 pt-2 w-full mx-auto justify-center md:justify-start">
                <Link
                  className="bg-[#AD242F] hover:bg-[#AD242F]/90 p-2"
                  href={"https://www.facebook.com/BDUltraRunners/"}
                >
                  <FaFacebook className="h-5 w-5 text-white" />
                </Link>

                <Link
                  className="bg-[#AD242F] hover:bg-[#AD242F]/90 p-2"
                  href="https://www.aedin.com/in/ultracamprunners/"
                  target="_blank"
                >
                  <FaLinkedin className="h-5 w-5 text-white" />
                </Link>

                <Link
                  className="bg-[#AD242F] hover:bg-[#AD242F]/90 p-2"
                  href="https://www.youtube.com/@bd.ultracamprunners"
                  target="_blank"
                >
                  <FaYoutube className="h-5 w-5 text-white" />
                </Link>
                <Link
                  className="bg-[#AD242F] hover:bg-[#AD242F]/90 p-2"
                  href={"https://wa.me/+8801886020826"}
                >
                  <FaWhatsapp className="h-5 w-5 text-white" />
                </Link>
              </div>

              {/* Terms & Policy */}
              {/* <div className="md:hidden flex gap-2 justify-center text-sm">
                <Link
                  href="/privacy-policy"
                  className="font-thin px-4 border-r-[1px] border-[#AD242F]"
                >
                  Privacy Policy
                </Link>
                <Link href="/terms-conditions" className="font-thin px-2">
                  Terms & Conditions
                </Link>
              </div> */}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-4 flex flex-col md:flex-row gap-2">
          <div className="text-sm text-center font-medium my-auto">
            We Accept
          </div>
          <div>
            <Image
              src="https://ultracamprunners.com/wp-content/uploads/2024/09/ssl-1024x33.jpg"
              alt="payment-methods"
              height={33}
              width={1024}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
