"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Store,
  Package,
  BarChart3,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  FileText,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Button from "@/components/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirigir al login si no está autenticado
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t("Verificando acceso...")}
          </p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Store,
      title: t("features.vendorManagement"),
      description: t("features.vendorDesc"),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Package,
      title: t("features.productInventory"),
      description: t("features.productDesc"),
      color: "from-green-500 to-green-600",
    },
    {
      icon: BarChart3,
      title: t("features.analyticsDashboard"),
      description: t("features.analyticsDesc"),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FileText,
      title: t("features.pdfExport"),
      description: t("features.pdfDesc"),
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: TrendingUp,
      title: t("features.realtimeStats"),
      description: t("features.realtimeDesc"),
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Globe,
      title: t("features.fullyResponsive"),
      description: t("features.responsiveDesc"),
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const benefits = [
    t("benefits.1"),
    t("benefits.2"),
    t("benefits.3"),
    t("benefits.4"),
    t("benefits.5"),
    t("benefits.6"),
    t("benefits.7"),
    t("benefits.8"),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 rounded-full"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-3xl shadow-2xl">
                  <Store className="text-white" size={64} />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              {t("landing.welcome")}{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ventas y Compras Leo
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
              {t("landing.subtitle")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              {t("landing.description")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => router.push("/dashboard")}
                size="lg"
                className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105">
                {t("landing.getStarted")}
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() => router.push("/vendors")}
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-4">
                {t("landing.exploreFeatures")}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              {[
                { icon: Zap, label: t("landing.fast"), value: "100%" },
                {
                  icon: Shield,
                  label: t("landing.secure"),
                  value: t("landing.typeSafe"),
                },
                {
                  icon: Globe,
                  label: t("landing.responsive"),
                  value: t("landing.allDevices"),
                },
                {
                  icon: TrendingUp,
                  label: t("landing.analytics"),
                  value: t("landing.realtime"),
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
                  <stat.icon
                    className="text-blue-600 dark:text-blue-400 mb-3 mx-auto"
                    size={32}
                  />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-white dark:fill-gray-900"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t("features.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
                <div
                  className={`bg-gradient-to-r ${feature.color} p-4 rounded-xl inline-block mb-4`}>
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("benefits.title")}
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t("benefits.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 hover:bg-white/20 transition-all">
                <CheckCircle
                  className="text-green-300 flex-shrink-0"
                  size={24}
                />
                <span className="text-white text-lg">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
              {t("cta.subtitle")}
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
              size="lg"
              className="text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105">
              {t("cta.launch")}
              <ArrowRight className="ml-2" size={24} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
                <Store className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold">Ventas y Compras Leo</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>{t("footer.builtWith")}</p>
              <p className="text-sm mt-2">{t("footer.rights")}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
