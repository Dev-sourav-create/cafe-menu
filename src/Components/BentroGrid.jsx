import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/Components/ui/Button";
import {
  QrCode,
  Utensils,
  ReceiptText,
  LayoutDashboard,
  Sliders,
} from "lucide-react";

const BentoGrid = () => {
  const features = [
    {
      title: "QR Code Ordering",
      description:
        "Each table has its own unique QR code. Guests can scan and order directly from their phone — no app required!",
      icon: QrCode,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
      colSpan: "md:col-span-3",
    },
    {
      title: "Manage Menu Instantly",
      description:
        "Add, remove, or update menu items in real-time from your dashboard. Changes reflect instantly for customers.",
      icon: Utensils,
      bg: "bg-yellow-50",
      iconColor: "text-yellow-600",
      colSpan: "md:col-span-3",
    },
    {
      title: "Track Orders Live",
      description:
        "View all active, completed, and pending orders at a glance — in one central dashboard.",
      icon: ReceiptText,
      bg: "bg-pink-50",
      iconColor: "text-pink-600",
      colSpan: "md:col-span-2",
    },
    {
      title: "Admin Dashboard",
      description:
        "Get complete control of your restaurant’s operations. Manage tables, track performance, and update settings effortlessly.",
      icon: LayoutDashboard,
      bg: "bg-green-50",
      iconColor: "text-green-600",
      colSpan: "md:col-span-2",
    },
    {
      title: "Customize Tables",
      description:
        "Set up table layouts, customize availability, and organize your restaurant floor plan with ease.",
      icon: Sliders,
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
      colSpan: "md:col-span-2",
    },
  ];

  return (
    <div id="features" className="mx-auto bg-[#f8fbfb] max-w-7xl  px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight">
          How <span className="text-blue-600">Bistro</span> Works
        </h2>
        <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
          A modern, fast, and seamless restaurant POS that simplifies ordering,
          tracking, and management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className={`${feature.colSpan} ${feature.bg} hover:scale-105 border-none hover:shadow-lg transition-all duration-300`}
            >
              <CardHeader>
                <Icon className={`w-10 h-10 ${feature.iconColor} mb-2`} />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                {feature.description}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-16">
        <Button
          size="lg"
          className="bg-gray-800 text-white hover:scale-105 active:scale-95 transition-transform"
        >
          Try Bistro Now
        </Button>
      </div>
    </div>
  );
};

export default BentoGrid;
