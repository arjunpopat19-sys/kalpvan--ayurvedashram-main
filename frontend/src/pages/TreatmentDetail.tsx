import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, CheckCircle, ArrowLeft, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTreatments } from "@/hooks/useTreatments";
import { treatments as defaultTreatments } from "@/data/treatments";

const TreatmentDetail = () => {
  const { id } = useParams();
  const { treatments, loading } = useTreatments();

  // Try to find API treatment first, fallback to static if API fails or is empty
  const allTreatments = treatments.length > 0 ? treatments : defaultTreatments;
  const treatment = allTreatments.find((t) => t.treatmentId === id);

  if (loading && treatments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-primary text-lg">Loading Treatment Details...</p>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Treatment Not Found</h1>
          <Link to="/treatments" className="text-primary underline">View All Treatments</Link>
        </div>
      </div>
    );
  }

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("youtube.com/embed/")[1]?.split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="pt-20">
      {/* Banner */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-primary mb-4 text-sm hover:underline">
            <ArrowLeft size={16} /> All Treatments
          </Link>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">{treatment.title}</h1>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{treatment.category}</span>
            <span className="flex items-center gap-1 text-muted-foreground text-sm"><Clock size={14} /> {treatment.duration}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">{treatment.description}</p>

          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {treatment.benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 bg-secondary rounded-xl p-4">
                <CheckCircle className="text-primary flex-shrink-0" size={20} />
                <span className="text-foreground text-sm">{b}</span>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Treatment Process</h2>
          <div className="space-y-6 mb-12">
            {treatment.process.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 bg-card rounded-2xl p-6 shadow-sm border border-border transition-all hover:shadow-md">
                {step.image && (
                  <div className="md:w-1/3 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shrink-0">
                    <img src={step.image} alt={step.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="md:flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-sm">
                      {i + 1}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{step.name || `Step ${i + 1}`}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-11">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {treatment.videoUrl && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <PlayCircle className="text-primary" size={28} />
                <h2 className="font-display text-2xl font-bold text-foreground">Therapy Video Preview</h2>
              </div>
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-border">
                <iframe
                  src={getYouTubeEmbedUrl(treatment.videoUrl)}
                  title={`${treatment.title} Video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/10">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">
              Interested in {treatment.title}?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Book a consultation today to learn how this treatment can benefit your mind, body, and spirit.</p>
            <Link to="/appointment">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all">
                Book Your Appointment Now
              </Button>
            </Link>
          </div>

          {treatment.isMainCategory && (
            <div className="mt-20">
               <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">Specific {treatment.category}</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {allTreatments
                    .filter(t => t.category === treatment.category && !t.isMainCategory)
                    .map(subT => (
                      <Link 
                        key={subT.treatmentId} 
                        to={`/treatments/${subT.treatmentId}`}
                        className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img src={subT.image} alt={subT.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6">
                           <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">{subT.title}</h3>
                           <p className="text-muted-foreground text-sm line-clamp-2">{subT.shortDescription}</p>
                           <span className="text-primary text-sm font-medium mt-4 inline-block">Know More →</span>
                        </div>
                      </Link>
                    ))
                  }
               </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TreatmentDetail;
