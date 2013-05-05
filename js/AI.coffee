# Author: Jules Wang  https://github.com/JulesWang
# This work is licensed under the terms of the GNU GPL, version 2 or later.
# See the LICENSE file in the top-level directory.

preprocess_map = (map, astar_map) ->

  for i in [0...25] by 1
    for j in [0...25] by 1
      score = check_obstacle(i, j)
      astar_map[i][j] = score

  return if !DEBUG

  myCanvas = document.getElementById("astar")
  ctx = myCanvas.getContext("2d")
  for i in [0...25] by 1
    for j in [0...25] by 1
      v = astar_map[i][j]
      if v is 0
        color = "white"
      else
        color = "rgb(" + v * 20 + ",0,0)"
      ctx.strokeStyle = ctx.fillStyle = color
      ctx.fillRect i * 16, j * 16, 16, 16
  
  return

check_obstacle = (x, y) ->
  s = 1

  for m in [0...2] by 1
    for n in [0...2] by 1
      return 0 if map[y + n][x + m] is GRID or map[y + n][x + m] is WATER
      s = 9 if is_wall(map[y + n][x + m])

  s

home_is_grid = () ->
  map[23][12] is GRID

pix2block = (v) ->
  Math.round(parseFloat(v/16))

Tank.prototype.think = (amap) ->
  aux_map = new Array(25)
  for i in [0...25] by 1
    aux_map[i] = new Array(25)
    for j in [0...25] by 1
      aux_map[i][j] = 0

  x = pix2block(this.x)
  y = pix2block(this.y)

  if home_is_grid()
    p = astar(x, y, pix2block(tanks[0].x), pix2block(tanks[0].y), amap, aux_map)
  else
    for i in [0...playerNum] by 1
      playerx = pix2block(tanks[i].x)
      playery = pix2block(tanks[i].y)
      if this.score is 100
        cross_fire aux_map, playerx, playery, 4
      else if this.score is 200
        cross_fire aux_map, playerx, playery, 4
  
    p = astar(x, y, 12, 24, amap, aux_map)

  if(x == p.x && p.y == y - 1)
    this.dir = UP
  else if(x == p.x && p.y == y + 1)
    this.dir = DOWN
  else if(y == p.y && p.x == x - 1)
    this.dir = LEFT
  else if(y == p.y && p.x == x + 1)
    this.dir = RIGHT


astar = (fromx, fromy, tox, toy, amap, aux_map) ->
  
  bh = new BinaryHeap((e) ->
    e.g + e.h
  )
  d = [[0, 1], [1, 0], [-1, 0], [0, -1]]
  bh.push
    x: fromx
    y: fromy
    g: 0
    h: 0
    pre: null

  flag = false
  path = []
  i = 0
  p = {}
  visited = 999

  until bh.size() is 0
    p = bh.pop()
    
    for i in [0...4] by 1
      nx = p.x + d[i][0]
      ny = p.y + d[i][1]

      if nx is tox and ny is toy
        flag = true
        break

      continue if nx < 0 or nx > 24 or ny < 0 or ny > 24 or amap[nx][ny] is 0
      dis = Math.abs(nx - tox) + Math.abs(ny - toy)
      cost = p.g + amap[nx][ny] + aux_map[nx][ny]
      
      continue if aux_map[nx][ny] is visited

      bh.push
        x: nx
        y: ny
        g: cost
        h: dis
        pre: p

      aux_map[nx][ny] = visited
    
     if flag
       path.push
         x: tox
         y: toy
       break

  #console.debug(count)
  while p?
    path.push p
    p = p.pre


  return path[path.length-2] if !DEBUG

  myCanvas = document.getElementById("astar")
  ctx = myCanvas.getContext("2d")
  ctx.beginPath()
  ctx.strokeStyle = ctx.fillStyle = "white"
  ctx.lineWidth = 1
  for i of path
    if i is 0
      ctx.moveTo path[i].x * 16, path[i].y * 16
    else
      ctx.lineTo path[i].x * 16, path[i].y * 16
  ctx.stroke()
  
  path[path.length-2]

is_bullet_proof = (x, y) ->
  return map[y][x] is GRID or is_wall(map[y][x])

cross_fire = (map, x, y, cost) ->
  v = 8

  m = x
  c = v
  while m >= 0 and not (is_bullet_proof(m, y) or is_bullet_proof(m, y+1))
    c--  if c > 0
    map[m][y] += cost + c
    m--

  m = x + 1
  c = v
  while m < 25 and not (is_bullet_proof(m, y) or is_bullet_proof(m, y+1))
    c--  if c > 0
    map[m][y] += cost + c
    m++

  n = y
  c = v
  while n >= 0 and not (is_bullet_proof(x, n) or is_bullet_proof(x+1, n))
    c--  if c > 0
    map[x][n] += cost + c
    n--

  n = y + 1
  c = v
  while n < 25 and not (is_bullet_proof(x, n) or is_bullet_proof(x+1, n))
    c--  if c > 0
    map[x][n] += cost + c
    n++

  return

is_wall = (v) ->
  v is WALL or v is 10 or v is 11 or v is 12 or v is 13

DEBUG = false
