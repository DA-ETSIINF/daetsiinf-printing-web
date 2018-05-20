# my androtest makefile




#
# VARS
#

PROJECT_NAME := "daetsiinf-printing-web"
PORT_HOST_PROD ?= 4200
PORT_HOST_DEV ?= 4201



PROD := prod
DEV := dev
DOCKERFILE_BASENAME := Dockerfile
DOCKERFILE_BASE := $(DOCKERFILE_BASENAME)
TAG_DOCKERFILE_BASE := $(PROJECT_NAME)_base

TYPE_DEPLOY = $(DEV)
# TAG ?= "$(PROJECT_NAME):$(TYPE_DEPLOY)"


PWD := `pwd`

PORT_ANGULAR := 4200
PORT_NGINX := 80
APP_CONTAINER_PATH := /app
APP_MODULE_CONTAINER_PATH := /app/node_modules
NAME_APPEND := container

#
# VARS
#



#
# TARGETS
#

all: dev

prod: set-prod build-base build-prod run-prod

dev: set-dev build-base build-dev run-dev

test: dev
	@docker exec -it $(NAME) ng test --watch=false


stop-prod: set-prod stop
stop-dev: set-dev stop

rm-prod: set-prod rm
rm-dev: set-dev rm

clean: clean-prod clean-dev
clean-prod: stop-prod rm-prod
clean-dev: stop-dev rm-dev

#
# TARGETS
#


#
# AUX
#

set-prod:
	$(eval TYPE_DEPLOY := $(PROD))
	$(eval DOCKERFILE := $(DOCKERFILE_BASENAME)-$(TYPE_DEPLOY))
	$(eval TAG := $(PROJECT_NAME):$(TYPE_DEPLOY))
	$(eval NAME := $(PROJECT_NAME)_$(TYPE_DEPLOY)_$(NAME_APPEND))

set-dev:
	$(eval TYPE_DEPLOY := $(DEV))
	$(eval DOCKERFILE := $(DOCKERFILE_BASENAME)-$(TYPE_DEPLOY))
	$(eval TAG := $(PROJECT_NAME):$(TYPE_DEPLOY))
	$(eval NAME := $(PROJECT_NAME)_$(TYPE_DEPLOY)_$(NAME_APPEND))


build-base:
	@docker build \
		--file $(DOCKERFILE_BASE) \
		--build-arg APP_CONTAINER_PATH=$(APP_CONTAINER_PATH) \
		--tag $(TAG_DOCKERFILE_BASE) \
		.

build-prod:
	docker build \
		--file $(DOCKERFILE) \
		--build-arg APP_CONTAINER_PATH=$(APP_CONTAINER_PATH) \
		--build-arg FROM=$(TAG_DOCKERFILE_BASE) \
		--tag $(TAG) \
		.

build-dev:
	docker build \
		--file $(DOCKERFILE) \
		--build-arg APP_CONTAINER_PATH=$(APP_CONTAINER_PATH) \
		--build-arg FROM=$(TAG_DOCKERFILE_BASE) \
		--tag $(TAG) \
		.

run-prod:
	docker run \
		-p $(PORT_HOST_PROD):$(PORT_NGINX) \
		--rm \
		--name $(NAME) \
		--detach \
		$(TAG)

run-dev:
	docker run -it \
		-v $(PWD):$(APP_CONTAINER_PATH) \
		-v $(APP_MODULE_CONTAINER_PATH) \
		-p $(PORT_HOST_DEV):$(PORT_ANGULAR) \
		-e CHOKIDAR_USEPOLLING=true \
		--rm \
		--name $(NAME) \
		$(TAG)

stop:
	@docker stop $(NAME)

rm:
	@docker rm -v -f $(NAME)
	@docker rmi -f $(NAME)


#
# AUX
#
