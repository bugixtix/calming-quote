"use client";
import React from "react";
import ShootingStars  from "@/pages/components/shooting-stars";
import  StarsBackground from "@/pages/components/stars-background";
function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <div className="relative shooting-stars-and-stars-background">
      <StarsBackground />
      <ShootingStars />
      <ShootingStars />
      <ShootingStars />
    </div>
  );
}
export default ShootingStarsAndStarsBackgroundDemo;