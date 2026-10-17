import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MotionReveal } from "@/components/motion-reveal";
import { SmoothScroll } from "@/components/smooth-scroll";

describe("motion accessibility contract", () => {
  it("keeps revealed content in the document flow", () => {
    const markup = renderToStaticMarkup(
      <MotionReveal className="sample-reveal">
        <p>محتوى واضح</p>
      </MotionReveal>,
    );

    expect(markup).toContain("data-reveal");
    expect(markup).toContain("محتوى واضح");
    expect(markup).toContain("sample-reveal");
  });

  it("does not remove the page content when smooth scrolling mounts", () => {
    const markup = renderToStaticMarkup(
      <SmoothScroll>
        <p>محتوى الصفحة</p>
      </SmoothScroll>,
    );

    expect(markup).toContain("محتوى الصفحة");
  });
});
