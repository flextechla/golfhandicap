"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRounds } from "@/hooks/useRounds";
import { createClient } from "@/lib/supabase-browser";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CourseManager from "@/components/settings/CourseManager";
import { exportToCSV } from "@/utils/helpers";
import type { Course } from "@/types";

type HelpSection = "faq" | "contact" | "privacy" | "terms" | null;

export default function SettingsPage() {
  const { user } = useAuth();
  const { rounds } = useRounds(user?.id);
  const [courses, setCourses] = useState<Course[]>([]);
  const [dark, setDark] = useState(false);
  const [section, setSection] = useState<HelpSection>(null);
  const supabase = createClient();

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await supabase
      .from("courses")
      .select("*")
      .order("name");
    setCourses((data as Course[]) || []);
  };

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("golf-dark-mode", String(next));
  };

  const toggle = (s: HelpSection) =>
    setSection((prev) => (prev === s ? null : s));

  return (
    <div>
      <Card>
        <h3 className="font-display text-xl mb-4">Preferences</h3>
        <Button variant="outline" onClick={toggleDark}>
          {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
        <Button
          variant="outline"
          className="mt-3"
          onClick={() => exportToCSV(rounds)}
        >
          Export Scores (CSV)
        </Button>
      </Card>

      <CourseManager courses={courses} onRefresh={loadCourses} />

      <Card>
        <h3 className="font-display text-xl mb-4">Help and Support</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => toggle("faq")}>FAQ</Button>
          <Button variant="outline" onClick={() => toggle("contact")}>Contact</Button>
          <Button variant="outline" onClick={() => toggle("privacy")}>Privacy</Button>
          <Button variant="outline" onClick={() => toggle("terms")}>Terms</Button>
        </div>
      </Card>

      {section === "faq" && (
        <Card>
          <h3 className="font-display text-xl mb-3">FAQ</h3>
          <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <div>
              <h4 className="font-bold text-golf-700 mb-1">
                How is my handicap calculated?
              </h4>
              <p>
                Each score produces a Score Differential using Course Rating
                and Slope. With 20 rounds, the app averages your best 8
                differentials and multiplies by 0.96.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-golf-700 mb-1">
                What are Rating and Slope?
              </h4>
              <p>
                Course Rating is the strokes a scratch golfer should take.
                Slope Rating is the relative difficulty for a bogey golfer
                vs scratch (standard is 113).
              </p>
            </div>
            <div>
              <h4 className="font-bold text-golf-700 mb-1">
                What does the Trend Arrow mean?
              </h4>
              <p>
                Green down arrow means improved. Red up arrow means rose.
                Orange sideways arrow means no change.
              </p>
            </div>
          </div>
        </Card>
      )}

      {section === "contact" && (
        <Card>
          <div className="text-center">
            <h3 className="font-display text-xl mb-3">Contact Us</h3>
            <p className="text-sm text-zinc-500 mb-4">
              Found a bug or have a suggestion?
            </p>
            <a
              href="mailto:support@lazybstudios.com?subject=Golf%20Tracker%20Support"
              className="inline-block bg-golf-700 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-golf-800 transition"
            >
              Email Support
            </a>
          </div>
        </Card>
      )}

      {section === "privacy" && (
        <Card>
          <h3 className="font-display text-xl mb-3">Privacy Policy</h3>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p className="font-bold mb-2">Effective: January 19, 2026</p>
            <p>
              We collect your email for account security and golf scores
              for tracking. We do not sell your data to advertisers. Your
              rounds are private unless you join a Group.
            </p>
          </div>
        </Card>
      )}

      {section === "terms" && (
        <Card>
          <h3 className="font-display text-xl mb-3">Terms of Service</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            By using Golf Tracker, you agree to report scores honestly.
            This app is for recreational use and is not an official
            GHIN-certified provider. Lazy B Studios is not liable for data
            loss or incorrect calculations.
          </p>
        </Card>
      )}
    </div>
  );
}
