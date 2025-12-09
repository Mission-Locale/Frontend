import Button from "../ui/Button";

export default function EventPanel({ event }) {
  let subEventComponent;
  switch (event.type) {
    case "appointment": {
      const user = null;
      subEventComponent = (
        <ul>
          <li>
            <b>Demandeur : </b>
            <span>
              {user.lastName} {user.firstName}
            </span>
          </li>
        </ul>
      );
      break;
    }
    case "workshop": {
      const workshopIteration = null;
      subEventComponent = (
        <>
          <ul>
            <li>
              <b>Atelier : </b>
              <span>{workshopIteration.workshop.name}</span>
            </li>
            <li>
              <b>Prochaines occurences</b>
              <div>
                {workshopIteration.workshop.iterations.map((iteration) => (
                  <Pill key={iteration.id} content={iteration.startDate} />
                ))}
              </div>
            </li>
            <li>
              <b>Sujet : </b>
              <span>{workshopIteration.subject}</span>
            </li>
            <li>
              <b>Animateurs : </b>
              <span>
                {[
                  ...workshopIteration.advisors,
                  ...workshopIteration.externalAnimators,
                ]}
              </span>
            </li>
            <li>
              <FoldBox header="Description du Sujet">
                <p>{workshopIteration.description}</p>
              </FoldBox>
            </li>
            <li>
              <FoldBox header="Inscrits">
                <ul>
                  {workshopIteration.registeredUsers.map((user) => (
                    <li key={user.id}>
                      {user.lastName} {user.firstName}
                    </li>
                  ))}
                </ul>
              </FoldBox>
            </li>
            <li>
              <FoldBox header="En liste d'attente">
                <ul>
                  {workshopIteration.waitingUsers.map((user) => (
                    <li key={user.id}>
                      {user.lastName} {user.firstName}
                    </li>
                  ))}
                </ul>
              </FoldBox>
            </li>
          </ul>
          <div className="flex flex-row">
            <Button
              text="Inscrire un demandeur"
              color="brandBlue"
              width="100%"
              variant="full"
              size="md"
              radiusSize="rounded-lg"
              onClick={handleUserRegistering}
            />
            <Button
              text="Se retirer"
              color="brandPink"
              width="100%"
              variant="full"
              size="md"
              radiusSize="rounded-lg"
              onClick={handleAdvisorUnsubscribe}
            />
          </div>
        </>
      );
      break;
    }
  }

  return (
    <>
      <h2>{event.title}</h2>
      <ul>
        <li>
          <b>Début : </b>
          <span>{event.startDate}</span>
        </li>
        <li>
          <b>Durée : </b>
          <span>{event.duration}</span>
        </li>
      </ul>
      <hr />
      {subEventComponent}
    </>
  );
}
