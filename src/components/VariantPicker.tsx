const VariantPicker = ({ variants, ...props }) => {
  if (variants.length === (0 || 1)) return null;

  return (
    <select
      {...props}
      className="appearance-none w-full relative mb-3 sm:mb-0 flex-grow sm:mr-3 pl-3 py-2 bg-white border border-gray-900 focus:border-black-100 shadow-sm text-gray-900 text-sm focus:outline-none focus:text-gray-900"
    >
      {variants.map(({ external_id, name }) => (
        <option key={external_id} value={external_id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default VariantPicker;
