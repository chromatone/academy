<script setup>
import { createNoise2D } from 'simplex-noise';
import { useTimestamp } from '@vueuse/core'
const noise2D = createNoise2D();
const value2d = noise2D(1, 2);

const timestamp = useTimestamp({ offset: -Date.now() })

const time = computed(() => timestamp.value / 10000)

const width = ref(1000)
const height = ref(700)

const cr1 = computed(() => {
  return [
    (0.5 + .5 * noise2D(time.value, 0)) * width.value,
    (0.5 + .5 * noise2D(time.value, 100)) * height.value
  ]
})

const cr2 = computed(() => {
  return [
    (2 - 1 * noise2D(time.value, 20)) * width.value,
    (.5 - .5 * noise2D(time.value, 400)) * height.value
  ]
})

const rr1 = ref(50)
const rr2 = ref(400)

function getPath(c1 = cr1.value, c2 = cr2.value, r1 = rr1.value, r2 = rr2.value) {

  const tps = getTangentPoints(c1, c2, r1, r2)

  return `
  M ${c1[0]} ${c1[1]}
  L ${c2[0]} ${c2[1]}
  Z
  `
}


function getTangentPoints() {
  // Destructure circle data
  const [x1, y1] = cr1.value
  const r1 = rr1.value
  const [x2, y2] = cr2.value
  const r2 = rr2.value

  const angle = Math.atan2(y2 - y1, x2 - x1)
  const points = []

  for (let p of [1, -1]) {
    const perp = angle + (p * Math.PI / 2)
    points.push(
      [
        x1 + r1 * Math.cos(perp),
        y1 + r1 * Math.sin(perp)
      ],
      [
        x2 + r2 * Math.cos(perp),
        y2 + r2 * Math.sin(perp)
      ],
    )
  }

  return points
}

function getSVGPath() {
  // Destructure circle data
  const [x1, y1] = cr1.value
  const r1 = rr1.value
  const [x2, y2] = cr2.value
  const r2 = rr2.value

  // Calculate tangent points
  const points = getTangentPoints();

  // Define starting and ending points
  const startPoint = points[0]; // First point from circle 1
  const endPoint = points[2]; // Last point from circle 2

  // Path string construction
  let path = `M ${startPoint[0]},${startPoint[1]}`; // Move to starting point

  // Line to first tangent point of circle 1
  path += ` L ${points[1][0]},${points[1][1]}`;

  // Large arc for circle 1
  path += ` A ${r1},${r1} 0 0 0 ${points[3][0]},${points[3][1]}`;

  // Line to first tangent point of circle 2
  path += ` L ${points[2][0]},${points[2][1]}`;

  // Large arc for circle 2
  path += ` A ${r2},${r2} 0 0 1 ${points[0][0]},${points[0][1]}`;

  // Close the path (optional)
  path += ` Z`;

  return path;
}



</script>

<template lang='pug'>
svg(:viewBox="`0 0 ${width} ${height}`" )
  text(x="100" y="50")
  //- line(stroke-width="50" stroke="red" x1="100" x2="900" y1="300" y2="400" stroke-linecap="round")
  //- 
  g(v-for="(_,n) in 12" :key="n" 
    :transform="`translate(${Math.sin(Math.PI*n/6)*200} ${Math.cos(Math.PI*n/6)*200})`"
    :fill="`hsl(${(-n+6)*30}deg,60%,50%)`"
    )
    circle(:cx="cr2[0]" :cy="cr2[1]" :r="rr2")

  g(v-for="(_,m) in 12" :key="m" 
    :transform="`translate(${Math.sin(Math.PI*m/6)*200} ${Math.cos(Math.PI*m/6)*200})`"
    :fill="`hsl(${(-m+6)*30}deg,60%,50%)`"
    )    
    path(:d="getSVGPath()"  )
  g(v-for="(_,k) in 12" :key="k" 
    :transform="`translate(${Math.sin(Math.PI*k/6)*200} ${Math.cos(Math.PI*k/6)*200})`"
    :fill="`hsl(${(-k+6)*30}deg,60%,50%)`"
    )        
    circle(:cx="cr1[0]" :cy="cr1[1]" :r="rr1")
</template>