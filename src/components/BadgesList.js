import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import "../styles/BadgeList.css";
import Gravatar from "./Gravatar";

function useSearchBadges(badges) {
  const [query, setQuery] = useState("");
  const [ filteredBadges, setFilteredBadges ] = useState(badges)

  useMemo(() => {
    const results = badges.filter((badge) =>
      `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    setFilteredBadges(results)
  }, [badges, query]);

  return { query, setQuery, filteredBadges}
}

function BadgesList(props) {
  const badges = props.badges;

  const { query, setQuery, filteredBadges } = useSearchBadges(badges)

  if (filteredBadges.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter badges</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>

        <h3>No encontramos ningún badge</h3>
        <Link to="/badges/new" className="btn btn-primary">
          Create new badge
        </Link>
      </div>
    );
  }

  const badgesList = filteredBadges.slice(0).reverse();

  return (
    <div className="Badges__list">
      <div className="Badges__container">
        <div className="form-group">
          <label>Filter badges</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>

        <ul className="BadgesList list-unstyled">
          {badgesList.map((badge) => {
            return (
              <li key={badge.id}>
                <Link
                  className="text-reset text-decoration-none"
                  to={`/badges/${badge.id}`}
                >
                  <div className="BadgesListItem">
                    <Gravatar
                      email={badge.email}
                      alt=""
                      className="BadgesListItem__avatar"
                    />
                    <div>
                      <div>
                        <strong>
                          {badge.firstName} {badge.lastName}
                        </strong>
                      </div>
                      <div className="Twitter__name">
                        <span className="Twitter__logo"></span>@{badge.twitter}
                      </div>
                      <div>{badge.jobTitle}</div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default BadgesList;
