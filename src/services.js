const interfacePath = "./interface"
module.exports = {
	coach: require(`${interfacePath}/service_coach`),
	client: require(`${interfacePath}/service_client`),
}
