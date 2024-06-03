import LinkModel from "../Models/LinkModel.js"
const LinksController = {
  getList: async (req, res) => {
    try {
      const links = await LinkModel.find()
      res.json({ links })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  },

  getById: async (req, res) => {
    try {
      const link = await LinkModel.findById(req.params.id)
      if (!link)
        return res.status(404).json({ message: "Link not found" })
      const targetParamName = link.targetParamName
      const targetParamValue = req.query.hasOwnProperty(targetParamName) ? req.query[targetParamName] : "xxx"
      link.clicks.push({ ipAddress: req.ip, targetParamValue: targetParamValue })
      await link.save()
      res.redirect(link.originalUrl)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  },

  add: async (req, res) => {
    const { originalUrl, targetParamName, targetValues } = req.body
    try {
      const newLink = await LinkModel.create({ originalUrl, targetParamName, targetValues })
      const host = req.get('host')
      const protocol = req.protocol
      const newLinkUrl = `${protocol}://${host}/${newLink.id}`
      res.json({ newLink, url: newLinkUrl })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  },

  update: async (req, res) => {
    const { id } = req.params
    try {
      const updatedLink = await LinkModel.findByIdAndUpdate(id, req.body, { new: true })
      res.json(updatedLink)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  },

  delete: async (req, res) => {
    const { id } = req.params
    try {
      const deleted = await LinkModel.findByIdAndDelete(id)
      res.json(deleted)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  },

  getClickInfoById: async (req, res) => {
    try {
      const link = await LinkModel.findById(req.params.id)
      if (!link)
        return res.status(404).json({ message: "Link not found" })
      const clickInfo = link.clicks.reduce((acc, click) => {
        const paramValue = click.targetParamValue || "unknown"
        if (!acc[paramValue]) {
          acc[paramValue] = 0
        }
        acc[paramValue]++
        return acc
      }, {})

      res.json(clickInfo)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }
}

export default LinksController
