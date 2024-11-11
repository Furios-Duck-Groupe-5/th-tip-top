import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";
import React from "react";

export const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Participer", href: "/participation" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
 // { label: "Mon compte", href: "/mon-compte" },
 //{ label: "Admin", href: "/admin" },
 // { label: "Gestion de gain", href: "/gain" },


];

export const testimonials = [
  {
    user: "Abbad Mohamed",
    company: "Furious duck",
    image: user1,
    text: "Magnfique",
  },
  {
    user: "Atmani",
    company: "Anas",
    image: user2,
    text: "Meilleur thé du monde",
  },
  {
    user: "Azzedine",
    company: "Safi",
    image: user3,
    text: "Je rcommande!",
  },
  {
    user: "Zakaria",
    company: "Teffah",
    image: user4,
    text: "Le jeu concours est top",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "wow.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "wow",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: (
      <span style={{ color: '#DDA15E' }}>bonjour bonjour bonjour</span>
    ),
    description: (
      <span style={{ color: '#DDA15E' }}>
        bonjour bonjour bonjourbonjour bonjour bonjourbonjour bonjour bonjour
      </span>
    ),
  },
  {
    icon: <Fingerprint />,
    text: (
      <span style={{ color: '#DDA15E' }}>bonjour bonjour bonjour</span>
    ),
    description: (
      <span style={{ color: '#DDA15E' }}>
        bonjour bonjour bonjourbonjour bonjour bonjourbonjour bonjour bonjourbonjour bonjour bonjour
      </span>
    ),
  },
  {
    icon: <ShieldHalf />,
    text: (
      <span style={{ color: '#DDA15E' }}>bonjour bonjour bonjour</span>
    ),
    description: (
      <span style={{ color: '#DDA15E' }}>
        bonjour bonjour bonjourts.
      </span>
    ),
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Preview",
    description: (
      <span style={{ color: '#DDA15E' }}>
        Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.
      </span>
    ),
  },
  {
    icon: <PlugZap />,
    text: "Collaboration Tools",
    description: (
      <span style={{ color: '#DDA15E' }}>
        Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.
      </span>
    ),
  },
  {
    icon: <GlobeLock />,
    text: "Analytics Dashboard",
    description: (
      <span style={{ color: '#DDA15E' }}>
        Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.
      </span>
    ),
  },
];

// Les autres tableaux restent inchangés

export const checklistItems = [
  {
    title: "Qualité Supérieure",
    description:
      "Tous nos thés sont soigneusement sélectionnés pour leur qualité exceptionnelle, provenant des meilleures plantations du monde.",
  },
  {
    title: "Origines Authentiques",
    description:
      "Nos thés proviennent de régions renommées, comme l'Assam en Inde, le Fujian en Chine et les montagnes d'Afrique, garantissant une richesse de saveurs.",
  },
  {
    title: "Sélection Éthique",
    description:
      "Nous travaillons directement avec des producteurs locaux pour assurer des pratiques durables et éthiques dans chaque tasse.",
  },
  {
    title: "Expérience Sensorielle",
    description:
      "Dégustez nos thés qui offrent une palette de saveurs unique, enrichissant vos moments de détente avec des arômes raffinés.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
