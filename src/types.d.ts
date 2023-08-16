type Children = {
  children: React.ReactNode
}

type Params = {
  params: Record<string, string>
}

type SearchParams = {
  searchParams: Record<string, string | string[] | undefined>
}

type FormattedFormData = {
  [key: string]: string | FormattedFormData
}
