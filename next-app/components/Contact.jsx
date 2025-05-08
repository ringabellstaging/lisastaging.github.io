import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-16 pt-8 md:py-32 w-full h-fit">
      <div className="px-[18px] mx-auto w-fit">
        <div className="mb-10 md:mb-14">
          <span className="text-sm font-semibold">Get a Quote</span>
          <h1 className="mt-1 mb-3 text-3xl font-semibold text-balance md:text-4xl">
            Speak with Our Friendly Team
          </h1>
          <p className="text-lg text-muted-foreground">
            We&apos;d love to assist you. Make a call or drop us an email to schedule your consultation.
          </p>
        </div>
        <div className="grid gap-5 md:gap-10 md:grid-cols-3">
          <div>
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <Mail className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">Email Us</p>
            <p className="mb-3 text-muted-foreground">
              Our team is ready to assist.
            </p>
            <a href="mailto:ssgxaa@gmail.com" className="font-semibold hover:underline">
              ssgxaa@gmail.com
            </a>
          </div>
          <div>
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <Phone className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold"> Call Us</p>
            <p className="mb-3 text-muted-foreground">
              We&apos;re available Mon-Sun, 9am-6pm.
            </p>
            <div className="space-y-1">
              <div>Mandarin:{' '}
                <a href="tel:+14169393962" className="font-semibold hover:underline">
                  416-939-3962
                </a>
              </div>
              <div> English:{' '}
                <a href="tel:+16475711788" className="font-semibold hover:underline">
                  647-571-1788
                </a>
              </div>
            </div>
          </div>
          <div>
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full"/>
            <p className="mb-2 text-lg font-semibold"> WeChat</p>
            {/* <p className="mb-3 text-muted-foreground">
              Scan the QR code to connect with us on WeChat.
            </p> */}
            <img
              src="/images/LisaWechatQR.jpg" // 
              alt="WeChat QR Code"
              className="w-24 h-24 object-contain rounded-md border"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact };
