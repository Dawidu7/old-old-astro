import { Button, Input, SearchSelect, Select } from "~/components"

const OPTIONS = [
  { id: 1, name: "David", age: 17 },
  { id: 2, name: "Patrick", age: 45 },
  { id: 3, name: "Joe", age: 65 },
  { id: 4, name: "Karen", age: 37 },
  { id: 5, name: "Lila", age: 18 },
  { id: 6, name: "Simon", age: 30 },
  { id: 7, name: "Harry", age: 27 },
  { id: 8, name: "Joshua", age: 31 },
  { id: 9, name: "Ethan", age: 28 },
]

export default function Home() {
  return (
    <div>
      <Input label="Name" name="name" />
      <Input label="Bio" name="bio" type="textarea" />
      <Input label="Age" name="age" type="number" />
      <Select label="Human" options={OPTIONS} name="human1" />
      <SearchSelect label="Human" options={OPTIONS} name="human2" />
      <Button>Click me!</Button>
    </div>
  )
}
