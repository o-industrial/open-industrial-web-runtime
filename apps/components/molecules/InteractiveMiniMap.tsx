// import { JSX } from 'preact';
// import { useReactFlow } from 'reactflow';

// export function InteractiveMiniMap() {
//   const { getNodes, setViewport, getViewport } = useReactFlow();

//   const nodes = getNodes();
//   const viewport = getViewport(); // returns { x, y, zoom }

//   const width = 180;
//   const height = 120;

//   const allX = nodes.map((n) => n.position.x);
//   const allY = nodes.map((n) => n.position.y);
//   const minX = Math.min(...allX, 0);
//   const minY = Math.min(...allY, 0);
//   const maxX = Math.max(...allX, 300);
//   const maxY = Math.max(...allY, 200);

//   const bounds = {
//     x: minX,
//     y: minY,
//     w: maxX - minX + 100,
//     h: maxY - minY + 100,
//   };

//   const scaleX = width / bounds.w;
//   const scaleY = height / bounds.h;

//   const handleClick = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
//     const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     const worldX = (clickX / scaleX) + bounds.x - width / 2;
//     const worldY = (clickY / scaleY) + bounds.y - height / 2;

//     setViewport({ x: -worldX, y: -worldY, zoom: viewport.zoom }, { duration: 400 });
//   };

//   return (
//     <div
//       onClick={handleClick}
//       style={{
//         width,
//         height,
//         borderRadius: '0.5rem',
//         boxShadow: '0 0 8px rgba(0,0,0,0.3)',
//       }}
//       class="-:absolute -:bottom-2 -:right-2 -:bg-neutral-800 -:border -:border-neutral-700 -:cursor-pointer"
//     >
//       {nodes.map((node) => {
//         const x = (node.position.x - bounds.x) * scaleX;
//         const y = (node.position.y - bounds.y) * scaleY;

//         let color = '#06B6D4';
//         if (node.data?.status === 'error') color = '#F43F5E';
//         else if (node.data?.status === 'warning') color = '#EAB308';

//         return (
//           <div
//             key={node.id}
//             style={{
//               position: 'absolute',
//               left: x,
//               top: y,
//               width: 8,
//               height: 8,
//               backgroundColor: color,
//               borderRadius: '50%',
//               transform: 'translate(-50%, -50%)',
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }
