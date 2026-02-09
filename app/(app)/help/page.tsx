"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type HelpSection = "faq" | "contact" | "privacy" | "terms" | null;

export default function HelpPage() {
  const [section, setSection] = useState<HelpSection>(null);

  const toggle = (s: HelpSection) =>
    setSection((prev) => (prev === s ? null : s));

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Button variant="outline" onClick={() => toggle("faq")}>FAQ</Button>
        <Button variant="outline" onClick={() => toggle("contact")}>Contact</Button>
        <Button variant="outline" onClick={() => toggle("privacy")}>Privacy</Button>
        <Button variant="outline" onClick={() => toggle("terms")}>Terms</Button>
      </div>

      {section === "faq" && (
        <Card>
          <h3 className="font-display text-xl mb-3">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <div>
              <h4 className="font-bold text-golf-700 mb-1">
                How is my handicap calculated?
              </h4>
              <p>
                Each score produces a &quot;Score Differential&quot; using Course
                Rating and Slope. With 20 rounds, the app averages your best 8
                differentials and multiplies by 0.96.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-golf-700 mb-1">
                What are Rating and Slope?
              </h4>
              <p>
                <strong>Course Rating:</strong> Strokes a scratch golfer should take.
              </p>
              <p>
                <strong>Slope Rating:</strong> Relative difficulty for a bogey
                golfer vs scratch (standard is 113).
              </p>
            </div>
            <div>
              <h4 className="font-bold text-golf-700 mb-1">
                What does the Trend Arrow mean?
              </h4>
              <p>
                <span className="text-golf-700 font-bold">↓ Green</span> = improved,{" "}
                <span className="text-danger font-bold">↑ Red</span> = rose,{" "}
                <span className="text-accent font-bold">↔ Orange</span> = no change.
              </p>
            </div>
          </div>
        </Card>
      )}

      {section === "contact" && (
        <Card className="text-center">
          <h3 className="font-display text-xl mb-3">Contact Us</h3>
          <p className="text-sm text-zinc-500 mb-4">
            Found a bug or have a suggestion?
          </p>
          <a
            href="mailto:support@lazybstudios.com?subject=Golf%20Tracker%20Support"
            className="inline-block bg-golf-700 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-golf-800 transition"
          >
            📧 Email Support
          </a>
        </Card>
      )}

      {section === "privacy" && (
        <Card>
          <h3 className="font-display text-xl mb-3">Privacy Policy</h3>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p className="font-bold mb-2">Effective: January 19, 2026</p>
            <p>
              We collect your email for account security and golf scores for
              tracking. We do not sell your data to advertisers. Your rounds are
              private unless you join a Group.
            </p>
          </div>
        </Card>
      )}

      {section === "terms" && (
        <Card>
          <h3 className="font-display text-xl mb-3">Terms of Service</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            By using Golf Tracker, you agree to report scores honestly. This app
            is for recreational use and is not an official GHIN-certified
            provider. Lazy B Studios is not liable for data loss or incorrect
            calculations.
          </p>
        </Card>
      )}
    </div>
  );
}
