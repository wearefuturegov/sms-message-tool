const SearchForm = ({ query, setQuery }): React.ReactElement => (
  <form>
    <label className="govuk-visually-hidden" htmlFor="search">
      Search by name or phone number
    </label>
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      id="search"
      type="search"
      className="govuk-input lbh-input"
      placeholder="Search..."
    />
  </form>
)

export default SearchForm
