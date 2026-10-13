import { Quote, Star } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import success1 from "@/assets/success-1.jpg";
import success2 from "@/assets/success-2.jpg";

const stories = [
  {
    id: 1,
    bride: "Kavitha",
    groom: "Suresh",
    location: "Chennai",
    date: "Married March 2024",
    img: success1,
    quote:
      "We matched on ShaadiTamil and within 3 months, our families met. Everything felt so natural — the platform made it easy to find someone who truly shared our values and culture.",
    rating: 5,
  },
  {
    id: 2,
    bride: "Anitha",
    groom: "Ramesh",
    location: "Madurai",
    date: "Married December 2023",
    img: success2,
    quote:
      "I was skeptical about online matrimony, but ShaadiTamil impressed me with how genuine the profiles were. My husband and I connected instantly. Truly grateful for this platform!",
    rating: 5,
  },
];

const SuccessStories = () => {
  const { ref: headRef, visible: headVisible } = useReveal();

  return (
    <section id="success" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 reveal ${headVisible ? "visible" : ""}`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Success <span className="text-primary italic">Stories</span>
          </h2>
          <p className="font-sans text-muted-foreground text-base max-w-xl mx-auto">
            Real Tamil families, real love stories. Join hundreds of couples who found their perfect match with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stories.map((story, i) => {
            const { ref, visible } = useReveal(i * 150);
            return (
              <div
                key={story.id}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`reveal ${visible ? "visible" : ""} bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-300`}
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={story.img}
                    alt={`${story.bride} & ${story.groom}`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent px-5 py-4">
                    <div className="font-serif font-bold text-xl text-card">{story.bride} & {story.groom}</div>
                    <div className="font-sans text-xs text-card/80">{story.location} · {story.date}</div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary/30 mb-2" />
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed italic">
                    "{story.quote}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats strip */}
        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            ["552+", "Success Marriages"],
            ["98%", "Satisfaction Rate"],
            ["15K+", "Active Members"],
            ["8 Yrs", "Of Trust"],
          ].map(([num, label], i) => {
            const { ref, visible } = useReveal(i * 80);
            return (
              <div
                key={label}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`reveal ${visible ? "visible" : ""} text-center p-5 bg-pink-light rounded-2xl border border-primary/15`}
              >
                <div className="font-serif font-bold text-3xl text-primary">{num}</div>
                <div className="font-sans text-xs text-muted-foreground mt-1 font-medium">{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
