import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';

const ROWS = 2;
const COLS = 7;
const GAP = 10; // sekat putih

const slots = Array.from({ length: ROWS * COLS }, (_, i) => i + 1);

export default function ParkingMap({ onSelectSlot }: { onSelectSlot: (id: number) => void }) {
  const [stageSize, setStageSize] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      setStageSize({
        width: Math.min(window.innerWidth * 0.85, 1400),
        height: Math.min(window.innerHeight * 0.5, 800),
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const SLOT_WIDTH = ((stageSize.width - GAP * (COLS + 1)) / COLS) * 0.85; 
  const SLOT_HEIGHT = SLOT_WIDTH * 3 / 2;

  return (
    <div className="flex justify-center items-center mt-8" style={{ padding: GAP }}>
      <Stage width={SLOT_WIDTH * COLS + GAP * (COLS + 1)} height={SLOT_HEIGHT * ROWS + GAP * (ROWS + 1)}>
        <Layer>
          {slots.map((id) => {
            const booked = localStorage.getItem('booking_' + id);
            const row = Math.floor((id - 1) / COLS);
            const col = (id - 1) % COLS;

            return (
              <Group
                key={id}
                x={GAP + col * (SLOT_WIDTH + GAP)}
                y={GAP + row * (SLOT_HEIGHT + GAP)}
                onClick={() => onSelectSlot(id)}
              >
                {/* Hanya slot parkir */}
                <Rect
                  width={SLOT_WIDTH}
                  height={SLOT_HEIGHT}
                  fill={booked ? 'red' : 'green'}
                  cornerRadius={6}
                />
                <Text
                  text={id.toString()}
                  fontSize={SLOT_WIDTH / 4}
                  fontStyle="bold"
                  fill="white"
                  width={SLOT_WIDTH}
                  height={SLOT_HEIGHT}
                  align="center"
                  verticalAlign="middle"
                />
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
