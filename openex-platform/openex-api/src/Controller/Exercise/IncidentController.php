<?php

namespace App\Controller\Exercise;

use App\Controller\Base\BaseController;
use App\Entity\Event;
use App\Entity\Exercise;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use OpenApi\Annotations as OA;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class IncidentController extends BaseController
{

    /**
     * @OA\Property(
     *    description="List incidents of an exercise"
     * )
     *
     * @Rest\View(serializerGroups={"incident"})
     * @Rest\Get("/api/exercises/{exercise_id}/incidents")
     */
    public function getExercisesIncidentsAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $exercise = $em->getRepository('App:Exercise')->find($request->get('exercise_id'));
        /* @var $exercise Exercise */

        if (empty($exercise)) {
            return $this->exerciseNotFound();
        }

        $this->denyAccessUnlessGranted('select', $exercise);

        $events = $em->getRepository('App:Event')->findBy(['event_exercise' => $exercise]);
        /* @var $events Event[] */

        $incidents = array();
        foreach ($events as $event) {
            $incidents = array_merge($incidents, $em->getRepository('App:Incident')->findBy(['incident_event' => $event]));
        }

        foreach ($incidents as &$incident) {
            $incident->setIncidentExercise($exercise->getExerciseId());
            $incident->setUserCanUpdate($this->hasGranted(self::UPDATE, $exercise));
            $incident->setUserCanDelete($this->hasGranted(self::DELETE, $exercise));
        }

        return $incidents;
    }

    private function exerciseNotFound()
    {
        return View::create(['message' => 'Exercise not found'], Response::HTTP_NOT_FOUND);
    }
}
