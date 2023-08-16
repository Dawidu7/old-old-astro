import db from "~/db"

function getAppData(app: string) {
  switch (app) {
    case "calculator":
      return {
        cameras: db.query,
      }
  }
}

export default function App({ params }: Params) {
  return <div>{params.app}</div>
}
