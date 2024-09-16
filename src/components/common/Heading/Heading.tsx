import { memo } from "react";

const Heading = memo(({ title }: { title: string }) => {
  return (
    <div className="mb-3" style={{ fontSize: "26px" , fontWeight:"bold" }}>
      {title}
    </div>
  );
});

export default Heading;
