const UniqueProductDetailSection = ({ title, detail, ref }) => (
  <div className="grid grid-cols-2 gap-4">
    <dt className="col-span-1 text-lg md:text-base font-medium text-gray-800 truncate">
      {title}
    </dt>
    <dd className="col-span-1 ff-text truncate">{detail}</dd>
  </div>
);

export default UniqueProductDetailSection;
