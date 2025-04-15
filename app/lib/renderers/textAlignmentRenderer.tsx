import { PortableText } from "@portabletext/react";
import { TypeFromSelection } from "groqd";
import { textAlignmentHorizontalResponsiveBlockQuery } from "~/qroq/alignment/text-alingment-horizontal-responsive";

export const textAlignmentProps = {
  textAlignment: textAlignmentHorizontalResponsiveBlockQuery(),
};

export type TextAlignmentRendererProps = TypeFromSelection<
  typeof textAlignmentProps
> & {
  children?: React.ReactNode;
};

export default function TextAlignmentRenderer({
  children,
  textAlignment,
}: TextAlignmentRendererProps) {
  const getAlignmentClasses = (size: "sm" | "lg") => {
    if (!textAlignment?.[size]) return "";

    // Helper function to sanitize the input values
    const sanitizeInput = (value: string | undefined) => {
      return value?.replace(/[^\w-]/g, ""); // Remove unexpected characters
    };

    // Sanitize the inputs
    const alingment = sanitizeInput(textAlignment[size]?.alignment);

    // Apply the `lg:` prefix if the size is `lg`
    const prefix = size === "lg" ? "lg:" : "";
    return `${prefix}text-${alingment || "left"}`;
  };

  return (
    <div
      className={`${getAlignmentClasses("sm")} ${getAlignmentClasses("lg")}`}
    >
      {children || <PortableText value={[]} />}
    </div>
  );
}
