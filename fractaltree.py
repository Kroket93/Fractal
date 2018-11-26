import pygame
import sys
import random
import math


#settings
scrwidth = 1900
scrheight = 1000
pygame.init()
game_over = False
screen = pygame.display.set_mode((scrwidth, scrheight))

clock = pygame.time.Clock()
fps = 60

def drawTree(x1, y1, angle, depth):
    if depth:
        x2 = x1 + int(math.cos(math.radians(angle)) * depth * 10.0)
        y2 = y1 + int(math.sin(math.radians(angle)) * depth * 10.0)
        pygame.draw.line(screen, (0,0,0), (x1, y1), (x2, y2), 1)
        drawTree(x2, y2, angle - angle1_mod, depth - 1)
        drawTree(x2, y2, angle + angle2_mod, depth - 1)
 





depthmodifier = 10
angle1_mod = 30
angle2_mod = 30

while not game_over:

	clock.tick()
	screen.fill((245,245,255))
	drawTree(800, 800, -90, depthmodifier)
	pygame.display.flip()
	print(fps)

	angle1_mod = angle1_mod + 0.1
	angle2_mod = angle2_mod - 0.1
	
	for event in pygame.event.get():

		if event.type == pygame.QUIT:
			sys.exit()

		if event.type == pygame.KEYDOWN:
			if event.key == pygame.K_RETURN:

				depthmodifier = depthmodifier + 1

			if event.key == pygame.K_BACKSPACE:

				depthmodifier = depthmodifier - 1

			if event.key == pygame.K_q:

				angle1_mod = angle1_mod - 1

			if event.key == pygame.K_w:

				angle1_mod = angle1_mod + 1

			if event.key == pygame.K_e:

				angle2_mod = angle2_mod - 1

			if event.key == pygame.K_r:

				angle2_mod = angle2_mod + 1



	
















	
	

	





	














