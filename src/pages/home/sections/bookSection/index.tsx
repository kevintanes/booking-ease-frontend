import { Button } from "@/components/ui/button";

const BookSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-linear-to-r from-brand-700 to-brand-600 rounded-3xl p-8 sm:p-12 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Ready to book your next service?
        </h2>
        <p className="text-brand-200 mb-8 max-w-lg mx-auto">
          Join thousands of happy customers who book their favorite services
          through BookEase.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Button
            variant="secondary"
            size="xl"
            className="text-base text-brand-700 active:scale-95"
          >
            Create free account
          </Button>
          <Button variant="outline" size="xl" className="text-base">
            Browse services
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookSection;
