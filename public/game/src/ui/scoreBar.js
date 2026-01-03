import { k } from "../kaboomLoader.js";

export function makeScoreBar(k, getScoreFn) {
  // Bar style settings (match health bar palette)
  const barWidth = 140;
  const barHeight = 16;
  const barColor = k.Color.fromHex("#ffe066"); // Yellow
  const borderColor = k.Color.fromHex("#bfa600"); // Darker yellow border
  const textColor = k.Color.fromHex("#20214a");

  return [
    k.rect(barWidth, barHeight),
    k.color(barColor),
    k.outline(2, borderColor),
    k.fixed(),
    k.pos(10, 80),
    {
      add() {
        this.scoreText = k.add([
          k.text(() => `Score: ${getScoreFn()}`, { size: 16, font: "glyphmesss" }),
          k.color(textColor),
          k.fixed(),
          k.pos(this.pos.x + barWidth / 2 - 48, this.pos.y + 2),
          {
            update() {
              this.text = `Score: ${getScoreFn()}`;
            },
          },
        ]);
      },
      update() {
        if (this.scoreText) this.scoreText.text = `Score: ${getScoreFn()}`;
      },
      destroy() {
        if (this.scoreText) k.destroy(this.scoreText);
      },
    },
  ];
}
