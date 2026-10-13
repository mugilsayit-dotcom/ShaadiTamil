import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";

const SearchSection = () => {
  const { ref, visible } = useReveal();

  return (
    <section id="search" className="gradient-section py-16 md:py-20">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto px-4 reveal ${visible ? "visible" : ""}`}
      >
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Find Your <span className="text-primary italic">Perfect Match</span>
          </h2>
          <p className="font-sans text-muted-foreground text-base max-w-xl mx-auto">
            Search through thousands of verified Tamil profiles using our smart matching system.
          </p>
        </div>

        {/* Search card */}
        <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-brand border border-border p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Looking for */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-widest">Looking for</label>
              <select className="w-full px-4 py-3 rounded-xl border border-border bg-background font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                <option>Bride</option>
                <option>Groom</option>
              </select>
            </div>

            {/* Age */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-widest">Age Range</label>
              <select className="w-full px-4 py-3 rounded-xl border border-border bg-background font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                <option>21 – 25</option>
                <option>26 – 30</option>
                <option>31 – 35</option>
                <option>36 – 40</option>
                <option>40+</option>
              </select>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-widest">Location</label>
              <select className="w-full px-4 py-3 rounded-xl border border-border bg-background font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                <option>Any Location</option>
                <option>Chennai</option>
                <option>Coimbatore</option>
                <option>Madurai</option>
                <option>Trichy</option>
                <option>Salem</option>
                <option>Abroad</option>
              </select>
            </div>

            {/* Community */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-widest">Community</label>
              <select className="w-full px-4 py-3 rounded-xl border border-border bg-background font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                <option>All Communities</option>
                <option>Mudaliar</option>
                <option>Nadar</option>
                <option>Pillai</option>
                <option>Chettiar</option>
                <option>Gounder</option>
                <option>Vellalar</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Advanced filters */}
            <button className="font-sans text-sm text-primary font-medium hover:underline underline-offset-2 transition-colors">
              + Advanced Filters (Education, Profession, Height...)
            </button>
            <Link to="/search">
              <Button
                className="gradient-primary text-primary-foreground border-0 font-sans font-semibold px-8 py-3 rounded-xl shadow-brand hover:opacity-90 active:scale-[0.97] transition-all text-base w-full sm:w-auto"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Matches
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
