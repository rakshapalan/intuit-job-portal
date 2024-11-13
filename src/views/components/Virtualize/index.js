import { List } from "react-virtualized";

export const VirtualizedList = ({
  data, // Array of data to render
  itemSize, // Height of each item in the list
  height, // Height of the visible list container
  width, // Width of the list container
  renderRow, // Function to render each item, receiving { index, style, data }
  ...otherProps // For any additional props like scroll offset, etc.
}) => {
  const Row = ({ index, style }) => {
    const item = data[index];

    return item ? <div style={style}>{renderRow({ item })}</div> : null;
  };
  console.log("data", data, width, itemSize, height);
  return (
    <List
      height={height} // height of the list container
      itemCount={data.length} // number of items in the list
      itemSize={itemSize} // height of each item
      width={width} // width of the list container
      {...otherProps} // spread the other props
    >
      {Row}
    </List>
  );
};
