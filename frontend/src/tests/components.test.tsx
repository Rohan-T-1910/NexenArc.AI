import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Shield } from "lucide-react";
import Button from "@/components/button";
import Badge from "@/components/badge";
import Card from "@/components/card";
import EmptyState from "@/components/empty_state";

describe("Shared UI Components", () => {
  describe("Button Component", () => {
    it("renders children and handles click events", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Start Investigation</Button>);

      const btn = screen.getByRole("button", { name: /start investigation/i });
      expect(btn).toBeInTheDocument();
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("respects disabled and loading states", () => {
      const handleClick = vi.fn();
      render(
        <Button disabled isLoading onClick={handleClick}>
          Processing
        </Button>
      );

      const btn = screen.getByRole("button");
      expect(btn).toBeDisabled();
      fireEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Badge Component", () => {
    it("renders text and variant styles", () => {
      render(
        <Badge variant="critical" showDot>
          CRITICAL
        </Badge>
      );

      const badge = screen.getByText("CRITICAL");
      expect(badge).toBeInTheDocument();
      expect(badge.closest("span")).toHaveClass("text-[#fb7185]");
    });
  });

  describe("Card Component", () => {
    it("renders children inside a styled card container", () => {
      render(
        <Card>
          <h2>Active Cases</h2>
        </Card>
      );

      expect(screen.getByText("Active Cases")).toBeInTheDocument();
    });
  });

  describe("EmptyState Component", () => {
    it("renders icon, title, description, and triggers action", () => {
      const onAction = vi.fn();
      render(
        <EmptyState
          icon={Shield}
          title="No cases found"
          description="Try adjusting your search criteria."
          actionLabel="Clear search"
          onAction={onAction}
        />
      );

      expect(screen.getByText("No cases found")).toBeInTheDocument();
      expect(screen.getByText("Try adjusting your search criteria.")).toBeInTheDocument();

      const btn = screen.getByRole("button", { name: /clear search/i });
      fireEvent.click(btn);
      expect(onAction).toHaveBeenCalledTimes(1);
    });
  });
});
